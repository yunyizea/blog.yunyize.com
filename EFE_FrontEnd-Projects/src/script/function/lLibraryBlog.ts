export default class yunyize_blog {
    public loadingElement: string = '<div class="loader"><svg viewBox="0 0 80 80"><circle id="test" cx="40" cy="40" r="32"></circle></svg></div><div class="loader triangle"><svg viewBox="0 0 86 80"><polygon points="43 8 79 72 7 72"></polygon></svg></div><div class="loader"><svg viewBox="0 0 80 80"><rect x="8" y="8" width="64" height="64"></rect></svg></div>';
    public DEBUGMODE: boolean | undefined;
    private loadingElementLoaded: boolean = false;

    constructor() {
        this.logTips();
    }

    public loadBlogs(blogs: Array<BlogsData>, el?: Element): Array<HTMLElement> {
        let blogElementArray: Array<HTMLElement> = [];

        for (let i = 0; i < blogs.length; ++i) {
            let itemElement = document.createElement('div');
            itemElement.setAttribute('class', 'blog-item');

            if (blogs[i].hasImage) {
                itemElement.innerHTML =
                    `<div class="blog-title">
                        <img class="blog-title-image" src="${blogs[i]['imageURL']}" alt="${blogs[i]['title']}">
                        <p class="blog-title-text">${blogs[i]['title']}</p>
                    </div>
                    <div class="blog-introduction">
                        <p class="blog-introduction-text">${blogs[i]['introduction']}</p>
                    </div>
                    <div class="blog-date">
                        <span>${blogs[i]['date']} - ${blogs[i]['lastChange']}</span>
                    </div>`;
            } else {
                itemElement.innerHTML =
                    `<div class="blog-title">
                        <p class="blog-title-text">${blogs[i]['title']}</p>
                    </div>
                    <div class="blog-introduction">
                        <p class="blog-introduction-text">${blogs[i]['introduction']}</p>
                    </div>
                    <div class="blog-date">
                        <span>${blogs[i]['date']} - ${blogs[i]['lastChange']}</span>
                    </div>`;
            }
            itemElement.onclick = () => {
                window.open(blogs[i].target);
            }

            blogElementArray.push(itemElement);
            el ? el.appendChild(itemElement) : '';
        }

        return blogElementArray;
    }

    public loadingAnimationInit(): HTMLElement {
        let loadingElement = document.createElement('div');
        loadingElement.setAttribute('class', 'loading');
        loadingElement.innerHTML = this.loadingElement;

        return loadingElement;
    }

    public loadingAnimation(containerEle: HTMLElement, loadingElement: HTMLElement): HTMLElement {
        containerEle.appendChild(loadingElement);

        let opacity = 0;
        let render = () => {
            if (!this.loadingElementLoaded) {
                opacity += 0.05;
                loadingElement.style.opacity = opacity.toString();

                if (opacity >= 1) {
                    loadingElement.style.opacity = '1';
                    this.loadingElementLoaded = true;

                    cancelAnimationFrame(loadingTimer);
                }
            }
            requestAnimationFrame(render);
        }
        let loadingTimer = requestAnimationFrame(render);

        return loadingElement;
    }

    public loadingAnimationOver(loadingElement: HTMLElement): void {
        let opacity = 1;
        let render = () => {
            if (this.loadingElementLoaded) {
                opacity -= 0.05;
                loadingElement.style.opacity = opacity.toString();

                if (opacity <= 0) {
                    loadingElement.remove()
                    this.loadingElementLoaded = false;

                    cancelAnimationFrame(loadingTimer);
                }
            }
            requestAnimationFrame(render)
        }
        let loadingTimer = requestAnimationFrame(render);
    }

    public optimizeContainerWidth = (containerPercentage: number, itemWidth: number, itemGap: number, container: HTMLElement): void => {
        let itemFullWidth: number = itemWidth + itemGap,
            containerWidth: number = window.innerWidth * containerPercentage

        let row: number = 0;

        if (containerWidth < itemFullWidth) {
            container.style.width = itemFullWidth + 'px';
            return;
        }

        row = Math.floor(containerWidth / itemFullWidth);
        containerWidth = row * itemFullWidth;

        container.style.width = containerWidth + 'px';
    }

    public showBlogItem(blogItems: Array<HTMLElement>) {
        blogItems.forEach((item: HTMLElement) => {
            let itemOpacity = 0;
            let fadeInFn = () => {
                itemOpacity += .05;
                item.style.opacity = itemOpacity.toString();
                if (itemOpacity >= 1) {
                    item.style.opacity = '1';
                    cancelAnimationFrame(render);
                }
                requestAnimationFrame(fadeInFn);
            }
            let render = requestAnimationFrame(fadeInFn);
        })
    }

    private logTips(): void {
        if (this.DEBUGMODE) {
            return;
        }

        console.log('%c\n\n\n欢迎来到云奕泽的博客，为了保护您的浏览器安全，请勿在此处输入任何代码或字符，谢谢配合。\n\n\n', 'color: #73d13d');
        console.log('%c\n\n\nYunyizeのブログへようこそ。ブラウザのセキュリティを保護するため、ここにはコードや文字を入力しないでください。ご協力いただきありがとうございます。\n\n\n', 'color: #73d13d');
        console.log('%c\n\n\nWelcome to Yunyize\'s Blog, in order to protect your browser security, please do not enter any codes or characters here, thank you for your cooperation.\n\n\n', 'color: #73d13d');
    }
}