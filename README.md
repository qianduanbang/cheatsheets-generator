# cheatsheets-generator

把 markdown 形式的速查表转化为一个静态 web 网站  

## 效果

具体请访问: <http://cheatsheets.ifmicro.com>  
这里是我使用本项目进行生成的 cheat sheets 静态 web 网站  

## 安装

安装:  

	git clone https://github.com/MwumLi/cheatsheets-generator.git
	cd cheatsheets-generator && npm install

## 命令

运行(开发):  
默认打开 <http://localhost:3000> 
使用了 [browsersync](http://www.browsersync.cn/), 方便多平台调试  

	make dev
	或
	npm run dev

构建:  

	make build
	或
	rm -rfv dist && npm run build
	
预览(请先构建):  

	make preview
	或
	npm run preview

发布:  

	make gh-pages
	或
	node build/gh-pages.js

清除构建内容:  

	make clean
	或
	npm -rfv dist

## 配置

主要在 `package.json` 的 `config` 选项:  

* `config.md.local` : 配置本地 cheatsheets markdown 的文件夹  
  如果不配置, 就默认为当前项目下的 `./sheets-md` 目录为 markdown 文件夹  

* `config.md.http` : 配置 cheatsheets markdown 远程仓库地址, 页面上会用其作为基地址构造 *在 Github 上编辑此页* 的链接  
  如果没有配置, 就不显示  

* `config.gh-pages` 下配置的是用来发布到 github 项目 `gh-pages` 分支的配置, 这个分支默认为 github 项目的项目站点  
  
		"config": {
			"gh-pages": {
				"git": '', //要发布的 github 项目地址
				"message": '', //自动提交的信息
				"user": '', //提交者的名字
				"email": '', //提交者的邮箱
				"cname": '', //为你的项目站点配置一个域名,还需要进行域名解析才能在访问哦
			}
		}

## markdown 仓库

标准的 markdown 语法即可, 因为要生成卡片式的瀑布流网站, 所以务必保持一下简单的规则:  

* `# 页面标题` 为页面标题, 一个页面只有一个页面标题  
* `## 命令主题` 为卡片的命令主题, 可以有卡片主题  
* 命令的简单描述用正常文本即可, 命令采用 markdown 换行缩进式代码块形式写  

好了, 就这些  
哦, 页面标题下第一个段落被认为是页面的简单介绍哦  

可以参考: <https://github.com/MwumLi/simple-cheatsheets>  

## 机缘巧合

1. 一个机缘巧合的机会, 看到这个页面 <https://shfshanyue.github.io/cheat-sheets/git>  
   页面中的卡片以瀑布流的形式展现, 而每一个小卡片, 是一个特定功能命令的记录,看起来很美好  
	 但是发现这个项目的生成方式有点"笨拙"  

2. 之前 Linux/Mac 下使用 [cheat](https://github.com/chrisallenlane/cheat) 这个工具去记录常用但是难以记忆的命令  
   这是个很好的素材  


