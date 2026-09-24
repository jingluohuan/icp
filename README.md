# 牢ICP laozai-icp
浅蓝色+浅粉色主题个人网站联盟备案系统，适配Cloudflare Pages部署。

## 部署步骤：
1. 将本项目上传到GitHub
2. Cloudflare Pages连接仓库：
   - 构建命令：留空
   - 输出目录：public
3. 绑定KV命名空间：
   - 新建KV命名空间：LAOZAI_ICP_SITES
   - Pages设置 -> 函数 -> KV绑定，变量名SITES_KV绑定到该命名空间
4. 重新部署即可
