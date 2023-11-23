# Example Mapping

## Format de restitution
*(rappel, pour chaque US)*

```markdown
## Titre de l'US (post-it jaunes)

> Question (post-it rouge)

### Règle Métier (post-it bleu)

Exemple: (post-it vert)

- [ ] 5 USD + 10 EUR = 17 USD
```

Vous pouvez également joindre une photo du résultat obtenu en utilisant les post-its.

## Story 1: Define Pivot Currency

```gherkin
As a Foreign Exchange Expert
I want to be able to define a Pivot Currency
So that I can express exchange rates based on it
```
Devise pivot devient notre devise
Impossible de créer une banque sans devise pivot
### Exemple : 
    EUR -> USD : 1.2
    USD -> EUR : 0.8
    EUR -> USD : 1.2
    EUR -> EUR : 1

    - Pas de devise  
    --> Creer une banque
    * Erreur : devise Pivot obligatoire

## Story 2: Add an exchange rate
```gherkin
As a Foreign Exchange Expert
I want to add/update exchange rates by specifying: a multiplier rate and a currency
So they can be used to evaluate client portfolios
```

### Exemple :

    - Banque : EUR
    - TC: KRW -> 3 => 10 -> 30 KRW
    - TC: KRW -> 4000€
    * 10€ -> 40000 KRW

## Story 3: Convert a Money

```gherkin
As a Bank Consumer
I want to convert a given amount in currency into another currency
So it can be used to evaluate client portfolios
```

### Exemple :

    - Banque : EUR
    - TC: USD -> 1.2 | -> 1.08 || -> 1.32
    - convert 100€ -> USD
    * 12 USD

    | KRW -> USD
    | KRW -> EUR -> USD

    RULE : RoundTripping
    - Banque : EUR
    - TC : USD -> 1.2
    -> convert 10€ -> USD -> $

    * 9€ <= resultat <= 11€
    * 10€ <= 10 <= 10

    Banque:EUR
    -> 10€ -> 10€ -> 10€
