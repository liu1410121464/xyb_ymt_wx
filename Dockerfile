#
# target frontend 前端资源
# example: docker build --build-arg --build-arg API_SERVICE=http://localhost --no-cache -t huafei-bos-frontend .
# -------------
FROM nginx:latest
# 作者
MAINTAINER test
# 声明端口无业务含义
EXPOSE 80
# 默认调用后台服务地址，本地联调时可通过参数化传入进来
ARG API_SERVICE=http://localhost
ENV API_SERVICE=$API_SERVICE
# 拷贝资源文件
COPY  ./dist/ /usr/share/nginx/html/
RUN chmod -R a+rx /usr/share/nginx/html/
# 拷贝nginx配置
COPY  ./default.conf.template /etc/nginx/conf.d
# 替换环境变量 https://blog.csdn.net/jiangqian6481/article/details/78310247
CMD envsubst '$API_SERVICE' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

