# KaiKaio

> 一代人终将老去，但也总有人正年轻

KaiKaio 是一个基于 Nuxt 4 构建的现代化个人博客系统前端项目，采用 Vue 3 + TypeScript 开发，支持服务端渲染（SSR）。

## 技术栈

- **框架**: Nuxt 4.x + Vue 3.x
- **语言**: TypeScript
- **样式**: Sass/SCSS
- **Markdown 解析**: marked
- **代码高亮**: highlight.js
- **图片查看**: viewerjs
- **User Agent 解析**: ua-parser-js

## 项目结构

```
KaiKaio/
├── app/                      # 应用主目录
│   ├── assets/               # 静态资源
│   │   └── styles/           # 样式文件
│   ├── components/           # 组件
│   │   ├── archive/          # 归档相关组件
│   │   ├── CommentPen/       # 评论组件
│   │   ├── CommentUa/        # UA 信息组件
│   │   ├── global/           # 全局组件
│   │   ├── layout/           # 布局组件
│   │   └── widget/           # 小部件
│   ├── composables/          # 组合式函数
│   ├── config/               # 配置文件
│   ├── layouts/              # 布局模板
│   ├── pages/                # 页面路由
│   ├── plugins/              # 插件
│   └── app.vue               # 根组件
├── server/                   # 服务端
│   └── api/                  # API 代理
├── static/                   # 静态文件
├── middleware/               # 中间件
├── util/                     # 工具函数
├── nuxt.config.ts            # Nuxt 配置
├── Dockerfile                # Docker 构建文件
└── docker-compose.yml        # Docker Compose 配置
```

## 功能特性

- 文章展示与详情页
- 音乐播放功能
- 心情记录模块
- 关于页面
- 响应式设计，支持移动端
- 服务端渲染（SSR）优化 SEO
- 页面过渡动画
- Markdown 渲染与代码高亮
- 图片预览功能
- 骨架屏加载效果

## 环境要求

- Node.js >= 18.x
- npm >= 9.x

## 安装

```bash
# 克隆项目
git clone https://github.com/your-username/KaiKaio.git

# 进入项目目录
cd KaiKaio

# 安装依赖
npm install
```

## 配置

在项目根目录创建 `.env` 文件：

```env
# API Base URL Configuration
NUXT_API_BASE_URL=http://your-api-server:4000/api
NUXT_PUBLIC_API_BASE_URL=http://your-api-server:4000/api
```

## 开发

```bash
# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 静态生成
npm run generate
```

## Docker 部署

### 使用 Docker Compose（推荐）

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 使用 Dockerfile 构建

```bash
# 构建镜像
docker build -t kaikaio .

# 运行容器
docker run -d \
  -p 3004:80 \
  -e NUXT_API_BASE_URL=http://your-api-server:4000/api \
  -e NUXT_PUBLIC_API_BASE_URL=http://your-api-server:4000/api \
  --name kaikaio-nuxt \
  kaikaio
```

## 类型检查

```bash
npm run typecheck
```

## 作者

**KaiKai**

- Email: 1035759181@qq.com

## License

本项目仅供个人学习和使用。
