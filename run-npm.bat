@echo off
:: Configuration du chemin vers votre installation portable de Node
set "NODE_DIR=C:\Users\alapios\Documents\__Programmes\node-v25.8.1-win-x64"

:: Ajout temporaire au PATH de cette session uniquement
set "PATH=%NODE_DIR%;%PATH%"

:: Lancement de npm avec tous les arguments passés au script (%*)
call "%NODE_DIR%\npm.cmd" %*
