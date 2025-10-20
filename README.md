# Next.js 仪表板应用

这是一个使用 Next.js App Router 构建的现代化仪表板应用程序，包含客户管理、发票管理等功能模块。

## 项目描述

本项目是一个功能完整的仪表板应用，具有以下特性：
- 用户认证系统（使用 NextAuth.js）
- 客户管理功能
- 发票管理功能
- 响应式设计（使用 Tailwind CSS）
- 数据可视化图表
- 文件上传功能（使用 Vercel Blob）

## 如何运行

### 环境要求
- Node.js 18+ 
- pnpm（推荐）或 npm

### 安装依赖
```bash
pnpm install
```

### 开发环境运行
```bash
pnpm dev
```

应用将在 http://localhost:3000 启动

### 生产环境构建和运行
```bash
# 构建应用
pnpm build

# 启动生产服务器
pnpm start
```

## 如何测试

### 运行代码检查
```bash
pnpm lint
```

### 运行类型检查
```bash
npx tsc --noEmit
```

### 数据库种子数据
```bash
# 访问种子数据端点
curl http://localhost:3000/api/seed
```

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **认证**: NextAuth.js
- **数据库**: PostgreSQL
- **文件存储**: Vercel Blob
- **图标**: Heroicons
- **表单验证**: Zod

## 项目结构

```
app/
├── api/           # API 路由
├── dashboard/     # 仪表板页面
├── login/         # 登录页面
├── lib/           # 工具函数和配置
└── ui/            # UI 组件
```

## 环境配置

请确保配置以下环境变量：
- 数据库连接字符串
- NextAuth.js 配置
- Vercel Blob 配置（如使用文件上传功能）
