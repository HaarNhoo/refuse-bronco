#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import http.server
import socketserver
import threading
import webbrowser
import os
import tempfile
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

_remove_splash()


# --- CONFIGURATION ---
PORT = 8000
# On cible le dossier 'dist' produit par le build
DIRECTORY = os.path.join(os.path.dirname(__file__), "dist","BroncoFuse")
# Chemin vers le logo
LOGO_PATH = os.path.join(os.path.dirname(__file__), "assets", "logo.png")

def start_server():
    """Lance le serveur HTTP en arrière-plan."""
    os.chdir(DIRECTORY)
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serveur actif sur le port {PORT}")
        httpd.serve_forever()

def launch_chrome():
    """Ouvre l'interface dans le navigateur par défaut."""
    webbrowser.open(f"http://localhost:{PORT}")

# --- INTERFACE GRAPHIQUE ---
root = Tk()
root.title("Bronco Controller Launcher")
root.geometry("300x350")
root.resizable(False, False)
root.configure(bg="white")

# Chargement du logo
try:
    img = PhotoImage(file=LOGO_PATH)
    # Redimensionnement si nécessaire (si l'image est plus grande que 256)
    logo_label = Label(root, image=img, bg="white")
    logo_label.pack(pady=20)
except Exception as e:
    Label(root, text="Logo non trouvé", bg="white").pack(pady=20)

Label(root, text="Serveur Bronco 40 Actif", font=("Arial", 12, "bold"), bg="white").pack()
Label(root, text=f"Port: {PORT}", bg="white").pack()
Label(root, text="Fermez cette fenêtre pour arrêter", font=("Arial", 8, "italic"), bg="white").pack(pady=10)

# Lancement des processus
threading.Thread(target=start_server, daemon=True).start()
root.after(1000, launch_chrome) # Attend 1 seconde que le serveur démarre

root.mainloop()
