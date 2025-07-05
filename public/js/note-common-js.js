document.addEventListener('DOMContentLoaded', function(){
    // 生成多层级目录导航
    const toc = document.getElementById('toc');
    if (toc) {
        const mainUl = document.createElement('ul');
        toc.appendChild(mainUl);

        // 获取所有标题并排序
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5'));

        // 标题层级映射
        const levelMap = {
            'h1': 1,
            'h2': 2,
            'h3': 3,
            'h4': 4,
            'h5': 5
        };

        // 保存每个级别的最后一个菜单项
        const lastLevelItems = {
            1: null,
            2: null,
            3: null,
            4: null,
            5: null
        };

        // 保存每个级别的ul
        const levelUls = {
            0: mainUl, // 主UL
            1: null,
            2: null,
            3: null,
            4: null,
            5: null
        };

        // 预处理，确定哪些标题有子菜单
        const headingsWithChildren = new Set();
        for (let i = 0; i < headings.length - 1; i++) {
            const currentLevel = levelMap[headings[i].tagName.toLowerCase()];
            const nextLevel = levelMap[headings[i + 1].tagName.toLowerCase()];

            if (nextLevel > currentLevel) {
                headingsWithChildren.add(headings[i]);
            }
        }

        // 处理所有标题
        headings.forEach(function(heading) {
            // 为每个标题创建ID
            if (!heading.id) {
                heading.id = heading.textContent.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
            }

            const level = levelMap[heading.tagName.toLowerCase()];

            // 创建菜单项
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + heading.id;
            a.textContent = heading.textContent;
            li.appendChild(a);

            // 检查是否有子菜单
            if (headingsWithChildren.has(heading)) {
                li.classList.add('has-children');
            }

            // 找到这个标题应该放在哪个ul下
            let parentLevel = level - 1;
            while (parentLevel > 0 && !levelUls[parentLevel]) {
                parentLevel--;
            }

            const parentUl = levelUls[parentLevel];
            parentUl.appendChild(li);

            // 为可能的子菜单创建ul
            if (headingsWithChildren.has(heading)) {
                const ul = document.createElement('ul');
                li.appendChild(ul);
                levelUls[level] = ul;
                
                // 默认子菜单隐藏
                ul.style.display = 'none';
            }

            // 更新最后一个菜单项
            lastLevelItems[level] = li;

            // 清除更深层级的缓存
            for (let i = level + 1; i <= 5; i++) {
                levelUls[i] = null;
                lastLevelItems[i] = null;
            }
        });

        // 添加展开/折叠功能
        document.querySelectorAll('.sidebar-nav .has-children > a').forEach(function(a) {
            a.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('expanded');
                
                // 切换子菜单显示状态
                const subMenu = parent.querySelector('ul');
                if (subMenu) {
                    subMenu.style.display = subMenu.style.display === 'none' ? 'block' : 'none';
                }
            });
        });
    }

    // 激活当前可见标题的逻辑
    function setActiveHeading() {
        const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5');
        let currentHeading = null;

        for (const heading of headingElements) {
            const rect = heading.getBoundingClientRect();
            if (rect.top > 0 && rect.top < window.innerHeight / 2) {
                currentHeading = heading;
                break;
            }
        }

        if (!currentHeading) {
            for (const heading of headingElements) {
                const rect = heading.getBoundingClientRect();
                if (rect.top > 0) {
                    currentHeading = heading;
                    break;
                }
            }
        }

        if (currentHeading) {
            document.querySelectorAll('.sidebar-nav .active').forEach(el => el.classList.remove('active'));

            const id = currentHeading.id;
            const menuItem = document.querySelector(`.sidebar-nav a[href="#${id}"]`);
            if (menuItem) {
                menuItem.parentElement.classList.add('active');

                let parent = menuItem.parentElement.parentElement;
                while (parent && !parent.classList.contains('sidebar-nav')) {
                    if (parent.parentElement && parent.parentElement.classList.contains('has-children')) {
                        parent.parentElement.classList.add('expanded');
                        // 显示父级菜单的子菜单
                        if (parent.style.display === 'none') {
                            parent.style.display = 'block';
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
    }

    // 滚动时更新活动标题
    window.addEventListener('scroll', setActiveHeading);
    setActiveHeading(); // 初始化

    // 回到顶部按钮功能
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 显示/隐藏回到顶部按钮
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
    }
});