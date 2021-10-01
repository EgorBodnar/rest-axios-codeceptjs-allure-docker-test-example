FROM mockserver/mockserver:mockserver-5.11.2

EXPOSE 1080

COPY mock-back-end-server/defaultMock.json .

USER nonroot

ENTRYPOINT ["java", "-Dfile.encoding=UTF-8", "-cp", "/mockserver-netty-jar-with-dependencies.jar:/libs/*", "-Dmockserver.propertyFile=/config/mockserver.properties","-Dmockserver.initializationJsonPath=\"defaultMock.json\"","-Dmockserver.logLevel=INFO", "org.mockserver.cli.Main"]

CMD ["-serverPort", "1080"]
