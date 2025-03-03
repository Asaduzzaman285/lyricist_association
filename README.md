#  Local To Git

```

npm run build 
cp .htaccess.server.cpanel dist/.htaccess
git add .
git commit -m "comment"
git push 
git branch -d cpanel
git checkout -b cpanel origin/cpanel
Get-ChildItem -Path . -Exclude '.gitignore', 'node_modules', 'dist' | Remove-Item -Recurse -Force
Move-Item -Path "dist\*" -Destination "." -Force
git add .
git commit -m "deployed to cpanel"
git push -u origin cpanel --force
git checkout main
```

# Cpanel pulling

```
cd public_html
rm -rf ./*
rm -rf .[^.]*

git clone https://github.com/Asaduzzaman285/lyricist_association.git .
git checkout cpanel
```