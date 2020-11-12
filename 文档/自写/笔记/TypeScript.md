# 新建或更改为ts项目
## 更改
```
vue add @vue/typescript
```
### 项目跑起来以后可能会报错
#### 强制消除错误的话可以在tsconfig.json中的compilerOptionszhong中添加noImpliciAny:false,这样错误会减少很多,不过需要深入了解一下,慎用!