#!/usr/bin/env python3
# -*- coding: utf-8 -*-
R"""
  ____                      _ _      
 / ___|___  _ __ ___  _ __ (_) | ___ 
| |   / _ \| '_ ` _ \| '_ \| | |/ _ \
| |__| (_) | | | | | | |_) | | |  __/
 \____\___/|_| |_| |_| .__/|_|_|\___|
                     |_|             
       
Compile l'ensemble de l'application avec toutes ses options;

----------------------------------------------------------------
Arnaud LAPIOS
Copyright (c) 2026 A.LAPIOS. Tous droits réservés.
Ce code source est protégé par les lois sur le copyright.
Toute reproduction ou utilisation non autorisée est interdite.
----------------------------------------------------------------
"""

import subprocess
import sys
from datetime import  datetime



__tool_name__ = "BroncoFuse"
__version__ = "0.1.0000"
__script_name__ = "bronco.py"


# --- À CONFIGURER ---
# vérifier que la ligne de commande de nuitka convient aux besoins
NUIKTA_COMMAND = [
    "python",
    "-m",
    "nuitka",
    # # --- standalone pour débugage ---
    # "--standalone",
    # "--follow-imports",

    # -- one file pour distribution ---
    "--onefile",
    "--onefile-windows-splash-screen-image=C:/Users/alapios/Documents/Programmes_C/refuse-bronco/src/assets/logo.png",

    # optimisation de rapidité (mais compilation plus longue)
    # "--lto=yes",

    # --- Python options ---
    "--python-flag=isolated",
    "--python-flag=no_docstrings",
    "--python-flag=no_asserts",
    "--enable-plugin=tk-inter",

    # --- includes ---
    # "--include-data-dir=C:/Users/alapios/Documents/Programmes_C/refuse-bronco/src/assets=src/assets",
    "--include-data-dir=C:/Users/alapios/Documents/Programmes_C/refuse-bronco/dist/BroncoFuse=dist/BroncoFuse",
    # "--noinclude-data-file=**/__pycache__/**",

    # --- outputs ---
    "--remove-output",
    "--windows-console-mode=disable",
    # "--windows-console-mode=force",
    f"--output-dir=Compile_{__tool_name__}",
    f"--output-filename={__tool_name__}",

    # --- options de l'exécutable
    "--windows-icon-from-ico=src/assets/logo.ico",
    "--company-name=HaarNhoo",
    f"--product-name={__tool_name__}",
    f"--file-version={__version__}",
    f"--product-version={__version__}",
    "--copyright='Copyright 2026 Haarnhoo, Licence Propriétaire'",

    __script_name__

]


def run_compilation():
    """Lance la commande Nuitka."""
    print("🚀 Lancement de la compilation Nuitka...")
    print(f"Commande : {' '.join(NUIKTA_COMMAND)}\n")

    try:
        # Exécute la commande. check=True lèvera une exception si Nuitka échoue.
        subprocess.run(NUIKTA_COMMAND, check=True, text=True)
        print("\n✅ Compilation Nuitka terminée avec succès.")
        return True
    except subprocess.CalledProcessError as e:
        print("\n❌ ERREUR: La compilation Nuitka a échoué.", file=sys.stderr)
        print(e, file=sys.stderr)
        return False
    except FileNotFoundError:
        print("\n❌ ERREUR: Commande 'python' ou 'nuitka' non trouvée.", file=sys.stderr)
        print("Assurez-vous que Nuitka est installé et que Python est dans votre PATH.", file=sys.stderr)
        return False


def main():
    """Main function."""
    start = datetime.now()
    # 1. Lancer la compilation
    if run_compilation():
        pass
    else:
        # La compilation a échoué
        print("\nCompilation failure.", file=sys.stderr)
        sys.exit(1) # Termine avec un code d'erreur


    duration = datetime.now() - start
    print(f"Durée de la compilation : {duration}")

if __name__ == "__main__":
    main()
