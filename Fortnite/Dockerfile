FROM python
WORKDIR /home/app
RUN ["pip3", "install", "pipenv"]

COPY Pipfile Pipfile.lock ./
RUN ["pipenv", "sync"]

COPY . .
ENTRYPOINT ["pipenv", "run", "start"]
