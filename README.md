# Mallory Emerson Birth Services Tools

This site provides a set of configurable tools to help run [child birth education classes](https://www.malloryemerson.com/) (but can be used for other  things as well). Each tool is driven via a configuration file. There are three tools today. If you want to configure your own site with these tools, please fork this repo and configure the files described below.


## Flip Board

The flip board tool allows you to have a grid of two-sides cards to flip through.


### Configuration 
To configure flip boards please edit the contents of `configuration/flipBoardConfig.json`.

The below example configures two flip boards. You can add as many as you want. The name configuration of each determines its url.

```
[
    {
        "name": "flipboard1",
        "title": "My Flip Board One",
        "cardBackgroundColorFront": "#737373",
        "cardBackgroundColorBack": "#78d0bb",
        "cards": [
            {
                "frontText": "Card 1 Front",
                "backText": "Card 1 Back"
            },
            {
                "frontText": "Card 2 Front",
                "backText": "Card 2 Back"
            },
            {
                "frontText": "Card 2 Front",
                "backText": "Card 2 Back"
            }
        ]
    },
     {
      "name": "flipboard2",
      "title": "My Flip Board Two",
      "cardBackgroundColorFront": "lightgrey",
      "cardBackgroundColorBack": "lightblue",
      "cards": [
          {
              "frontText": "Card 1 Front",
              "backText": "Card 1 Back"
          },
          {
              "frontText": "Card 2 Front",
              "backText": "Card 2 Back"
          },
          {
              "frontText": "Card 2 Front",
              "backText": "Card 2 Back"
          }
      ]
  }
]
```



## Card Sort

The card sort tool allows you to have have a set of cards on top and categories below to drag the cards between.


### Configuration 
To configure card sorts please edit the contents of `configuration/cardSortConfig.json`.

The below example configures two card sorts. You can add as many as you want. The name configuration of each determines its url.

```
[
 {
        "name": "decisions",
        "title": "Decision Sorter",
        "cardBackgroundColor": "#78d0bb",
        "categories": [
            {
                "title": "Growing Foods",
                "description": "Foods that help you grow"
            },
            {
                "title": "Fun Foods",
                "description": "Foods that are fun but don't help your body"
            }
        ],
        "cards": [
            {
                "text": "Candy"
            },
            {
                "text": "Vegatables"
            },
            {
                "text": "Aaron Rogers"
            },
            {
                "text": "Pizza"
            }
        ]
    },
    {
        "name": "sports",
        "title": "Sports Player Sorter",
        "categories": [
            {
                "title": "Tennis",
                "description": "Raquet sport"
            },
            {
                "title": "Baseball",
                "description": "Bat Sport"
            },
            {
                "title": "Basketball",
                "description": "Hoop Sport"
            }
        ],
        "cards": [
            {
                "text": "Derek Jeter"
            },
            {
                "text": "Roger Federer"
            },
            {
                "text": "LeBron James"
            }
        ]
    }
]
```



## Tri-Color Board

The tri color board tool allows you to have have a set of cards on on a board that you start off  with an initial color that you then can toggle between two additional colors.


### Configuration 
To configure tri-color boards please edit the contents of `configuration/triColorBoardConfig.json`.

The below example configures two card sorts. You can add as many as you want. The name configuration of each determines its url.

```
[
    {
        "name": "tricolorBoard1",
        "title": "First TriColor Board",
        "cardColorOne": "#ffffff",
        "cardColorTwo": "#F9928F",
        "cardColorThree": "#C5E0B3",
        "cards": [
            {
                "text": "One"
            },
            {
                "text": "Two"
            },
            {
                "text": "Three"
            }
        ]
    },
    {
        "name": "tricolorBoard2",
        "title": "Second TriColor Board",
        "cardColorOne": "#ffffff",
        "cardColorTwo": "grey",
        "cardColorThree": "green",
        "cards": [
            {
                "text": "Uno"
            },
            {
                "text": "Dos"
            },
            {
                "text": "Tres"
            }
        ]
    }
]
```


