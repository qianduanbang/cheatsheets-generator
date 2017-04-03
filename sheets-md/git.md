# git

git 是一个分布式版本管理系统, 也是一个命令行工具, 三大操作系统都支持(Mac, Linux, Windows)  

## 初始化仓库

初始化仓库:  

	git init

初始化裸仓库:  

	git init --bare

克隆仓库:  

	git clone <git-repo>

## 忽略文件 [sdf](sdf)

添加本项目的忽略文件:  

	vim .gitignore

添加本项目的忽略文件并不把此文件纳入版 `small` 本管理**sdfsdf**:  

	vim .git/info/excludes

设置全局忽略文件  

	git config --global core.excludesfile ~/.gitignore 
	jsdhgf
	sdkfhj

对已加入版本管理的文件不做更改检查 You com  

	git update-index --assume-unchanged <file>

对已加入版本管理的文件做更改检查  

	git update-index --no-assume-unchanged <file>

## 编辑

编辑配置文件:  

	git config [--global] -e

列出配置信息:  

	git config -l

获取相应的配置:  

	git config --get core.editor

输出彩色信息:  

	git config color.ui true

设置文件名大小写敏感:  

	git config core.ignoreCase false

设置推送策略为 simple:  

	git config push.default simple

设置 git 的编辑器是 vim:  

	git config --global core.editor vim

设置命令别名:  

	git config --global alias.co checkout



## fff

aaaksdfj:	`fgfd`
## 忽略文件

添加本项目的忽略文件:  

	vim .gitignore

添加本项目的忽略文件并不把此文件纳入版本管理:  

	vim .git/info/excludes

设置全局忽略文件  

	git config --global core.excludesfile ~/.gitignore 
	jsdhgf
	sdkfhj

对已加入版本管理的文件不做更改检查  

	git update-index --assume-unchanged <file>

对已加入版本管理的文件做更改检查  

	git update-index --no-assume-unchanged <file>

