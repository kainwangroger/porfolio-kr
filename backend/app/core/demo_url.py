"""Validation des URLs de démo affichées publiquement.

Un bouton « Tester » ne doit apparaître que si le lien mène quelque part depuis
le navigateur d'un visiteur. Deux familles d'URLs échouent à ce critère et se
sont retrouvées en base via l'ancienne heuristique de `import_github.py` :

- les adresses locales (`localhost`, `127.0.0.1`, `0.0.0.0`, `[::1]`, réseaux
  privés), qui renvoient le visiteur sur sa propre machine ;
- les URLs devinées à partir du nom du dépôt, qui n'ont jamais été vérifiées.

Ce module ne valide que le premier cas — le second se règle à la source, en ne
générant plus d'URL. `PLACEHOLDER_DEMO_HOSTS` sert au script de nettoyage pour
purger l'historique.
"""

from urllib.parse import urlparse

LOCAL_HOSTNAMES = {"localhost", "127.0.0.1", "0.0.0.0", "::1", "[::1]"}

PRIVATE_PREFIXES = ("10.", "192.168.", "172.16.", "172.17.", "172.18.", "172.19.")

#: Hôtes sur lesquels l'ancien script fabriquait des URLs jamais vérifiées.
PLACEHOLDER_DEMO_HOSTS = ("huggingface.co",)


def is_public_demo_url(url: str | None) -> bool:
    """Vrai si l'URL est atteignable depuis le navigateur d'un visiteur."""
    if not url:
        return False

    parsed = urlparse(url.strip())
    if parsed.scheme not in ("http", "https"):
        return False

    host = (parsed.hostname or "").lower()
    if not host:
        return False
    if host in LOCAL_HOSTNAMES or host.endswith(".local"):
        return False
    if host.startswith(PRIVATE_PREFIXES):
        return False

    return True
