## windos  局域网共享目录

##### 1.找到要共享电脑的盘符这里以D盘为例,点击属性

![image-20250704194811335](https://images.devcxj.xyz/noteimg/image-20250704194811335.png)

##### 2.打开后选择共享再点击高级共享

![image-20250704195208769](https://images.devcxj.xyz/noteimg/image-20250704195208769.png)



##### 3.勾选共享此文件夹再点击权限

![image-20250704195507951](https://images.devcxj.xyz/noteimg/image-20250704195507951.png)

##### 4.看是否默认是所有用户组,如果是就勾选下面所有权限

![image-20250704195810282](https://images.devcxj.xyz/noteimg/image-20250704195810282.png)

##### 5.如果共享权限的组或用户名没有所有人或为空的话,点击添加,输入everyone后点击确定

![image-20250704200134557](https://images.devcxj.xyz/noteimg/image-20250704200134557.png)

##### 6.看到共享权限里面有组或用户名后点击应用再点击确定

![image-20250704200512860](https://images.devcxj.xyz/noteimg/image-20250704200512860.png)

![image-20250704200605200](https://images.devcxj.xyz/noteimg/image-20250704200605200.png)

然后就可以看到你的盘符已经变成了共享式的,并且有盘符的网络路径,点击确定就行

![image-20250704200652181](https://images.devcxj.xyz/noteimg/image-20250704200652181.png)

##### 7.来到要访问共享盘符的电脑,右击此电脑,没有的话就按照下面图片操作

![image-20250704201307526](https://images.devcxj.xyz/noteimg/image-20250704201307526.png)

![image-20250704201250307](https://images.devcxj.xyz/noteimg/image-20250704201250307.png)

##### 8.点击映射网络驱动器

![image-20250704201428452](https://images.devcxj.xyz/noteimg/image-20250704201428452.png)

##### 9.输入要访问的网络盘符路径(这里用的是目标主机ip,不知道的话可以win+r cmd ipconfig 查看),然后点击完成

![image-20250704201427666](https://images.devcxj.xyz/noteimg/image-20250704201427666.png)

##### 10.如果显示如下第一张图所示(就表示使用的不是网络共享访问的账号密码)需要添加一个共享文件的账号

![image-20250704210500481](https://images.devcxj.xyz/noteimg/image-20250704210500481.png)

![image-20250704205940541](https://images.devcxj.xyz/noteimg/image-20250704205940541.png)

![image-20250704210017967](https://images.devcxj.xyz/noteimg/image-20250704210017967.png)

##### 11.最后使用添加账号验证,点击完成,win + e 或打开文件资源管理显示目标主机共享文件夹或盘符就表示共享成功了

![image-20250704201426666.png](https://images.devcxj.xyz/noteimg/image-20250704201426666.png)

