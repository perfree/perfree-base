FROM anapsix/alpine-java:8_server-jre_unlimited
MAINTAINER perfree <perfree@126.com>
ADD target/perfree-server.tar.gz perfree-server.tar.gz
RUN tar -zxvf perfree-server.tar.gz
ENV TZ=Asia/Shanghai
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar", "/perfree-server/perfree-server.jar"]

