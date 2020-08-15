# day01
## Git操作
* 自己创建仓库
  * 新建远程仓库
  * git init 初始化本地仓库
  * git add . / git commit -m '' 本地版本控制
  * git remote add origin xxx 关联远程仓库
  * git push -u origin master 推送分支（首次）

  * git checkout -b xxx 新建并切换分支
  * git push origin xxx 推送分支

* 拉取别人代码
  * git clone xxx 克隆仓库
  * cd xxx 进入仓库
  * git fetch origin xiongjian:xiongjian 拉取远程仓库xiongjian分支到本地仓库xiongjian分支上
  * git checkout xiongjian 切换到xiongjian分支
  * 将来如果要更新xiongjian分支的内容：git pull origin xiongjian

## 开发组件流程
1. 定义组件 Test
2. 在 src/config/asyncComps 中引入组件并暴露
3. 在页面中，权限管理/菜单管理 添加指定菜单
4. 在页面中，权限管理/角色管理 给当前角色(admin)设置可访问组件权限

