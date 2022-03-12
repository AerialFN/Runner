FROM python:slim
WORKDIR /home/app
RUN ["/usr/local/bin/pip3", "install", "pipenv"]

COPY Pipfile Pipfile.lock ./
RUN ["/usr/local/bin/pipenv", "install", "--system", "--deploy"]

COPY . .
ENTRYPOINT ["python3", "-m", "src"]
