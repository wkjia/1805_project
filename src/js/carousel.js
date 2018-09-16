 console.log(666)
 var Carousel = function (options) {
                //属性
                //默认值,如果没有传就用默认的,传了就用
                let defaults = {
                    ele: '',//必传参数,div
                    imgs: [],//必传参数,图片路径
                    width: 810,
                    height: 320,
                    index: 0,//默认初始索引值
                    page: true,//是否有分页
                    button: true,//是否有点击翻页按钮
                    type: 'horizontal',//动画类型:vertival(垂直),horizontal(水平),fade(淡入淡出)
                    seamless: true,//是否无缝滚动,这个可以不要.
                    duration:5000,//轮播时间
                }

                //扩展默认参数
                this.opt = Object.assign({}, defaults, options);

                this.init();
                console.log(this);//Carousel
            }

            //方法
            //初始化
            Carousel.prototype.init = function () {
                var opt = this.opt;
                //获取/生成元素
                //绑定事件
                var ele = document.querySelector(opt.ele);

                //指定专有类型
                ele.classList.add('lx-carousel');
                // ele.className = 'lx-carousel';

                //设置样式(宽高)
                ele.style.width = opt.width + 'px';
                ele.style.height = opt.height + 'px';

                //生成图片(ul,li,img)
                let ul = document.createElement('ul');

                //根据图片路径生成li
                ul.innerHTML = opt.imgs.map(url => {
                    return `<li><a href="#"><img src = "${url}"></a></li>`
                }).join('');

                //把第一张图片复制到最后,无缝关键
                ul.appendChild(ul.children[0].cloneNode(true));

                //重新获取ul的长度
                opt.len = ul.children.length;

                //传递len
                this.len = opt.len;

                //给ul添加类型:设置轮播类型
                ul.className = opt.type;//horizontal,vertical,fade

                //水平轮播需要给ul添加宽度
                if (opt.type === 'horizontal') {
                    ul.style.width = opt.width * opt.len + 'px';
                } else if (opt.type === 'fade') {
                    ul.style.width = opt.width + 'px';
                    ul.style.height = opt.height + 'px';
                }

                console.log(ul.style.width)//1200;

                //写入页面
                ele.appendChild(ul);

                //分页
                if (opt.page) {
                    this.page = document.createElement('div');
                    this.page.className = 'page';
                    for (var i = 0; i < this.len - 1; i++) {
                        var span = document.createElement('span');
                        span.innerHTML = i + 1;

                        //高亮
                        if (i === opt.index) {
                            span.className = 'active';
                        }
                        this.page.appendChild(span);
                    }
                    ele.appendChild(this.page);
                }

                //左右按钮
                if (opt.button) {
                    let btnPrev = document.createElement('span');
                    btnPrev.className = 'btn-prev';
                    btnPrev.innerHTML = '&lt;';

                    let btnNext = document.createElement('span');
                    btnNext.className = 'btn-next';
                    btnNext.innerHTML = '&gt;';

                    ele.appendChild(btnPrev);
                    ele.appendChild(btnNext);
                }

                //传递参数
                this.ul = ul; //第153行
                this.ele = ele;//第142行

                //初始化
                //页面进入时自动轮播
                this.timer = setInterval(this.autoPlay.bind(this), opt.duration);
                this.play();

                //鼠标移入移出
                ele.onmouseover = () => {
                    // console.log(666)
                    this.stop();
                }
                ele.onmouseout = () => {
                    this.timer = setInterval(this.autoPlay.bind(this), opt.duration);
                }

                //点击切换分页
                ele.onmouseover = e => {
                    this.stop();
                    if (e.target.parentNode.className === 'page') {
                        opt.index = e.target.innerText - 1;
                        this.play();
                        // e.stopPropagation()
                    } else if (e.target.className === 'btn-prev') {
                        opt.index--;
                        this.play();
                        // e.stopPropagation()
                    } else if (e.target.className === 'btn-next') {
                        opt.index++;
                        this.play();
                        // e.stopPropagation()
                    }
                }
                 ele.onclick = e => {
                    this.stop();
                    if (e.target.parentNode.className === 'page') {
                        opt.index = e.target.innerText - 1;
                        this.play();
                        // e.stopPropagation()
                    } else if (e.target.className === 'btn-prev') {
                        opt.index--;
                        this.play();
                        // e.stopPropagation()
                    } else if (e.target.className === 'btn-next') {
                        opt.index++;
                        this.play();
                        // e.stopPropagation()
                    }
                }
            }

            //自动播放
            Carousel.prototype.autoPlay = function () {
                this.opt.index++;
                this.play();
            }

            Carousel.prototype.play = function () {
                let opt = this.opt;

                //水平无缝滚动关键2：当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
                if (opt.index >= this.len) {
                    opt.index = 1;
                    if (opt.type === 'horizontal') {
                        this.ul.style.left = 0;
                    } else if (opt.type === 'vertical') {
                        this.ul.style.top = 0;
                    }
                } else if (opt.index < 0) {
                    opt.index = this.len - 2;
                    if (opt.type === 'horizontal') {
                        //opt.width指的是div的宽度
                        this.ul.style.left = -opt.width * (this.len - 1) + 'px';
                    } else if (opt.type === 'vertical') {
                        this.ul.style.top = -opt.height * (this.len - 1) + 'px';
                    }

                }

                var obj = {}

                //水平
                if (opt.type === 'horizontal') {
                    obj.left = -opt.index * opt.width;
                    animate(this.ul, obj);
                } else if (opt.type === 'vertical') {
                    obj.top = -opt.index * opt.height;
                    animate(this.ul, obj)
                } else if (opt.type === 'fade') {
                    for (var i = 0; i < this.len; i++) {
                        animate(this.ul.children[i], { opacity: 0});
                    }
                    animate(this.ul.children[opt.index], { opacity: 1});
                    // console.log(this.ul.children[opt.index])
                }

                //页码高亮
                if (this.page) {
                    for (let i = 0; i < this.len - 1; i++) {
                        //如果i等于当前索引值,就添加类名
                        if (i === this.opt.index) {
                            this.page.children[opt.index].className = 'active';
                        } else {
                            this.page.children[i].className = '';
                        }
                    }

                    // 当到达复制图片动画时，高亮显示第一个页码
                    if (this.opt.index === this.len - 1) {
                        this.page.children[0].className = 'active';
                    }
                }


            }

            //停止
            Carousel.prototype.stop = function () {
                clearInterval(this.timer);
            }
            new Carousel({
                ele: '.banner',
                width: 1200,
                height: 535,
                index: 0,
                page: true,
                button: true,
                type: 'horizontal',
                imgs: ["img/b1.jpg","img/b2.jpg","img/b3.jpg","img/b4.jpg","img/b5.jpg","img/b6.jpg"]
            })