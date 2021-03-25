# 小店海报小程序子仓库commit信息生成器 
> 在小店海报子仓库生成与https://yipanyangguang.com/commit.html 相同内容的信息

# 命令
查看版本
rch --version

查看帮助
rch --help

查看当前是否是小店海报子仓库
rch --env

自动生成对应的commit信息，且提交commit
rch -m "本次修改的内容"

# 注意
因为是基于路径判断的，可以支持新增extension，但是extension得按照之前的规范来命名，后续会改成扫描文件的形式来判断extension

# 使用方法
在子仓库下，替换以下命令
```bash
git commit -m "修改内容"
```
替换为
```bash
rch -m "修改内容"
```