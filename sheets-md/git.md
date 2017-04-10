# git

git 是一个分布式版本管理系统, 也是一个命令行工具, 三大操作系统都支持(Mac, Linux, Windows)  

没有使用 `git add` 纳入版本管理的文件都属于未追踪文件  

为避免误操作把某些未追踪文件纳入版本管理, 我们经常把它们忽略掉, 即在 `.gitignore` 忽略某些文件, 那些被忽略的文件可以简称忽略文件  

在 Git 中，用 `HEAD` 表示当前提交即最新一个提交,上一个提交就是 `HEAD^ `，上上一个提交就是 `HEAD^^`，当然往上100个提交写100个 `^` 比较容易数不过来，所以写成 `HEAD~100`  

## 初始化仓库

初始化仓库:  
	
	git init

初始化裸仓库:  

	git init --bare

克隆仓库:  

	git clone <git-repo>

## 配置

编辑配置文件:  

	git config [--global] -e

列出配置信息:  

	git config -l

获取相应的配置:  

	git config --get core.editor

设置 git 的编辑器是 vim:  

	git config --global core.editor vim

配置用户邮箱:  

	git config --global user.email <mail>

配置用户名:  

	git config --global user.name <name>

输出彩色信息:  

	git config color.ui true

设置文件名大小写敏感:  

	git config core.ignoreCase false

设置推送策略为 simple:  

	git config push.default simple


设置命令别名:  

	git config --global alias.co checkout

允许 git clean 不需要 `-f`:
	
	git config --global clean.requireForce false

## 忽略文件

添加本项目的忽略文件:  

	vim .gitignore

添加本项目的忽略文件并不把此文件纳入版本管理:  

	vim .git/info/excludes

设置全局忽略文件:  

	git config --global core.excludesfile ~/.gitignore

## 添加删除移动文件

添加所有文件到暂存区，包括未追踪文件:  

	git add -A

更新暂存区文件:  

	git add -u

交互式添加文件到暂存区:  

	git add -p

工作区与暂存区删除文件:  

	git rm <file>

仅暂存区删除文件:  

	git rm --cached <file>

重命名暂存区文件:  

	git mv <file> <newfile>

## 工作区状态

查看工作区的信息:  

	git status

查看工作区信息并显示分支及追踪信息:  

	git status -sb

## 显示更改

显示暂存区与工作区的不同:  

	git diff

显示本地仓库与暂存区的不同:  

	git diff --cached

显示工作区与本地仓库的不同:  

	git diff HEAD

仅显示改变的文件:  

	git diff --name-only

比较两次提交的差异:  

	git diff <commit> <commit>

显示某次 commit 所做的更改:  

	git show <commit>

显示某个文件的详细修改记录:  

	git log -p <file>

图形化显示分支合并:  

	git log --oneline --graph --decorate

## 储藏与恢复

储藏(stash)工作区相对暂存区更改的文件:  

	git stash

储藏文件并添加描述信息:  

	git stash save <message>

恢复最后一次储藏的文件:  

	git stash apply

恢复最后一次储藏的文件并删除此次储存记录:  

	git stash pop

查看储藏列表:  

	git stash list

## 清理未追踪文件

清除未追踪且未忽略的文件:  

	git clean

列出未追踪且未忽略的文件:  

	git clean -n

清除未追踪且未忽略的目录:  

	git clean -d

列出未追踪且未忽略的文件和目录:  

	git clean -nd

清除未追踪且未忽略的文件和目录:

	git clean -d

清除未追踪的忽略文件:  

	git clean -X

强制执行清除操作(`clean.requireForce` 为 `true` 阻止清除操作):  

	git clean -f

## 恢复工作区

重置工作区某文件:  

	git checkout -- <file>

重置工作区:  

	git checkout .

## 回退版本

重置暂存区:  

	git reset
	# 或
	git reset HEAD
	# 或
	git reset --mixed

重置工作区和暂存区:  

	git reset --hard

回退本分支到某次提交, 重置暂存区:  

	git reset --mixed <commit-ish>

回退本分支到某次提交, 重置工作目录和暂存区:  

	git reset --hard <commit-ish>

回退本分支到某次提交:  

	git reset --soft <commit-ish>

回退到倒数第n+1个提交:  

	git reset --soft HEAD~n

反向恢复一个提交并生成新的提交:  

	git revert <commit>

## 代码回滚

> `revert` 操作不会删除旧的提交, 而是撤销指定提交的更改作为一个新的提交  

撤销最新 n 个提交的更改, 然后增加为一个新的提交:  

	git revert HEAD~n

撤销一个指定的提交的更改, 然后增加未一个新的提交:  

	git revert <commit>

## 分支

列出本地分支:  

	git branch

列出本地分支与追踪关系:  

	git branch -vv

列出远程分支:  

	git branch -r

列出所有分支:  

	git branch -a

更改分支名字:  

	git branch -m <newbranch>

设置追踪分支:  

	git branch -u <upstream>

## 创建分支

创建分支:  

	git branch <branch>

创建分支并切换到新分支:  

	git checkout -b <branch>

指定提交创建一个游离分支:  

	git checkout <commit>

指定提交创建分支并切换到新分支:  

	git checkout -b <branch> <commit>

创建一个没有提交历史的分支并切换到新分支: 

	git checkout --orphan <branch>

创建一个空分支:  

	# 创建一个无提交历史分支
	git checkout --orphan <branch>
	# 删除上一个分支留下的文件
	git rm -rf .
	# 需要提交一些东西,新分支才能看到
	touch README.md && git add . && git commit -m 'init README.md'

## 删除分支

删除已被合并的分支:  

	git branch -d <branch>

强制删除未被合并的分支:  

	git branch -D <branch>

## 合并分支

合并分支 A 到当前分支:  

	git merge A

合并多个分支到当前分支:  

	git merge A B

## 切换分支

切换分支:  

	git checkout <branch>

切换到最近一次分支:  

	git checkout -

## 远程仓库

添加远程仓库并命名为 origin:  

	git remote add origin <git-repo>

删除名为 origin 的远程仓库地址:  

	git remote remote origin

重命名远程仓库简称:  

	git remote origin origin1

修改远程仓库的地址:  

	git remote set-url origin <git-repo>

列出所有的远程仓库:  

	git remote -v

列出远程仓库 origin 的详细信息:  

	git remote show origin

## 推送与拉取

设置默认推送策略为 simple:  

	git config push.default simple

推送 master 到远程仓库 origin 的 master:  

	git push origin master

推送本地 A 分支到远程仓库 origin 的 B 分支:  

	git push origin A:B

删除远程仓库 origin 的 B 分支:  

	git push origin :B

推送到远程仓库并建立追踪关系:  

	git push -u origin master

从远程仓库拉取文件:  

	git pull origin master

## 提交

提交:  

	git commit -m <message>

追加提交重置提交信息:  

	git commit --amend -m <message>

重置作者:  

	git commit --amend --author=<mail>

允许空提交:  

	git commit --allow-empty

提交时跳过 pre-commit hook:  

	git commit -n

## 日志

显示提交日志:  

	git log

显示某文件的提交日志:  

	git log -p <file>

以图表形式显示提交日志:  

	git log --graph --all --oneline --decorate

显示每次提交的对象信息:  

	git log --pretty=raw

显示某个时间段的提交信息:  

	git log --since '2 days ago'

显示指定作者的提交信息:  

	git log --author=<author>

根据提交信息中的关键字查找:  

	git log --grep=<keyword>

列出二者特有的提交:  

	git log master...develop

列出 branch 有而 branch2 没有的提交:  

	git log branch2..branch

仅显示 merge commit:  

	git log --merges

统计每个作者的提交情况:  

	git shortlog

统计每个作者的提交个数:  

	git shortlog -sn

## 标签

列出所有标签:

	git tag -l

列出所有标签并显示标签信息:  

	git tag -ln

添加一个轻量标签:  

	git tag v1.0

添加一个附注标签:  

	git tag -a v1.0.0 -m <message>

在某个 commit 上添加一个标签:  

	git tag v0.9.0 <commit>

删除一个标签:  

	git tag -d v1.0.0

删除远程仓库的 tag:  

	git push origin :refs/tags/<tagname>

查看某个标签信息:  

	git show v1.0.0

推送 tag `v1.0` 到远程仓库:  

	git push origin v1.0

推送所有标签到远程仓库:  

	git push --tags

以 tag 的提交为基础创建一个新分支:  

	git checkout -b branch_v1.0 v1.0

取得两个 tag 之间的 commmit:  

	git log --pretty=oneline tagA..tagB

## 追责

显示一个文件每一行最后一次提交情况:  

	git blame <file>

显示指定文件第`n,m`行最后一次提交:  

	git blame -L n,m <file>

显示指定文件第n行开始的m行最后一次提交:  

	git blame -L n,+m <file>

显示指定文件第n行结束的前m行最后一次提交:  
	
	git blame -L n,-m <file>

## 查找

显示已追踪文件中包含关键字的行:  

	git grep hello

显示已追踪文件中包含关键字的行, 并显示行号:  

	git grep -n hello
	
## 打包

打包:  

	git archive -o arch.zip HEAD

