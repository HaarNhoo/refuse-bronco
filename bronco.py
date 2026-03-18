#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import http.server
import socketserver
import threading
import webbrowser
import os
import sys
import tempfile
from pathlib import Path
import mimetypes
import traceback
from tkinter import Tk, Label, PhotoImage

def _remove_splash():
    if "NUITKA_ONEFILE_PARENT" in os.environ:
        splash_filename = os.path.join(
            tempfile.gettempdir(),
            "onefile_%d_splash_feedback.tmp" % int(os.environ["NUITKA_ONEFILE_PARENT"]),
        )
        if os.path.exists(splash_filename):
            os.unlink(splash_filename)
        print("Done... splash should be gone.")

def get_base_dir():
    """
    Détermine le répertoire de base.
    Avec Nuitka, __file__ pointe automatiquement vers le dossier source en mode dev,
    ET vers le dossier d'extraction temporaire en mode OneFile !
    """
    return Path(__file__).resolve().parent

def main():
    """Main Fonction."""
    _remove_splash()

    # --- CONFIGURATION ---
    PORT = 8008

    # Récupération des chemins (Correction de la portée des variables)
    BASE_PATH = get_base_dir()
    DIRECTORY = os.path.join(BASE_PATH, "dist", "BroncoFuse")
    LOGO_PATH = os.path.join(DIRECTORY,  "assets", "logo.png")
    ICON_PATH = os.path.join(DIRECTORY,  "assets", "logo.ico")

    def start_server():
        import mimetypes
        import traceback

        # 1. Rediriger les sorties standards vers le vide (évite le crash des print())
        sys.stdout = open(os.devnull, 'w')
        sys.stderr = open(os.devnull, 'w')

        # 2. Créer un Handler personnalisé qui refuse d'écrire des logs
        class QuietHandler(http.server.SimpleHTTPRequestHandler):
            def log_message(self, format, *args):
                # On surcharge la méthode de log pour qu'elle ne fasse rien du tout
                pass

        try:
            mimetypes.init()
            mimetypes.add_type('image/x-icon', '.ico')

            CRASH_FILE = os.path.join(Path(sys.executable).resolve().parent if getattr(sys, 'frozen', False) else BASE_PATH, "crash_log.txt")

            if not os.path.exists(DIRECTORY):
                with open(CRASH_FILE, "w", encoding="utf-8") as f:
                    f.write(f"ERREUR : Le dossier {DIRECTORY} n'existe pas.\n")
                return

            os.chdir(DIRECTORY)
            socketserver.TCPServer.allow_reuse_address = True

            # 3. Utiliser notre QuietHandler au lieu de l'original
            with socketserver.TCPServer(("127.0.0.1", PORT), QuietHandler) as httpd:
                httpd.serve_forever()

        except Exception as e:
            with open(CRASH_FILE, "w", encoding="utf-8") as f:
                f.write(f"CRASH FATAL DU SERVEUR : {e}\n")
                f.write(traceback.format_exc())

    def launch_chrome():
        """Ouvre l'interface dans le navigateur par défaut."""
        webbrowser.open(f"http://127.0.0.1:{PORT}")

    # --- INTERFACE GRAPHIQUE ---
    root = Tk()
    root.title("Bronco Controller Launcher")
    root.geometry("500x400") # "300x400")
    root.resizable(False, False)
    root.configure(bg="white")
    root.iconbitmap(ICON_PATH)

    # Chargement du logo avec gestion d'erreur améliorée
    try:
        if os.path.exists(LOGO_PATH):
            img = PhotoImage(file=LOGO_PATH)
            logo_label = Label(root, image=img, bg="white")
            logo_label.pack(pady=20)
        else:
            Label(root, text="Logo File not found", bg="white", fg="red").pack(pady=20)
    except Exception as e:
        Label(root, text=f"Erreur logo : {e}", bg="white", fg="red").pack(pady=20)

    Label(root, text="Serveur Bronco 40 Actif", font=("Arial", 12, "bold"), bg="white").pack()
    Label(root, text=f"Port: {PORT}", bg="white").pack()
    # Label(root,text=DIRECTORY,bg='white').pack()
    # Label(root,text=LOGO_PATH,bg='white').pack()
    Label(root, text="Fermez cette fenêtre pour arrêter", font=("Arial", 8, "italic"), bg="white").pack(pady=10)

    # Lancement des processus
    threading.Thread(target=start_server, daemon=True).start()
    root.after(2000, launch_chrome) # Attend 2 secondes que le serveur démarre

    root.mainloop()

if __name__ == "__main__":
    main()
