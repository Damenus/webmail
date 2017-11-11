FROM microsoft/aspnetcore-build AS builder

RUN npm install

WORKDIR /source

# caches restore result by copying csproj file separately
COPY *.csproj .
RUN dotnet restore

# copies the rest of your code
COPY . .

# RUN npm install protractor rimraf http-server @angular/cli -g
# RUN npm install
RUN npm rebuild node-sass --force
RUN dotnet publish --output /app/

FROM microsoft/aspnetcore
WORKDIR /app
COPY --from=builder /app .
ENTRYPOINT ["dotnet", "WebMail.dll"]