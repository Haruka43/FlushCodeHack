# 戻り値サンプル <!-- omit in toc -->

## 変更履歴

| 日付       | 対象箇所 | 変更内容                     |
| ---------- | -------- | ---------------------------- |
| 2024/05/14 | 全体     | 新規作成                     |
| 2024/05/20 | 目次     | 同一名の見出しを目次から除外 |

## 目次

- [変更履歴](#変更履歴)
- [目次](#目次)
- [前提](#前提)
- [ベットフェーズ](#ベットフェーズ)
  - [チェック](#チェック)
  - [ベット](#ベット)
  - [コール](#コール)
  - [レイズ](#レイズ)
  - [ドロップ](#ドロップ)
  - [オール・イン](#オールイン)
- [ドローフェーズ](#ドローフェーズ)
  - [交換無し](#交換無し)
  - [交換あり](#交換あり)

## 前提

全ての関数の引数は `GameInfo` 型のデータです。
この資料で解説する引数のデータはポイントとなる箇所を抜き出して記載します。
型の詳細については、別紙、「Flush Code Hack 仕様書」の「型定義」の項目を参照してください。

この資料では、「DemoPlayer1」のプレイヤーとして解説します。

## ベットフェーズ

### チェック

#### 引数 <!-- omit in toc -->

```json
{
  // (中略)
  "phase": "bet-1",
  "pot": 800,
  "minBetPoint": 0,
  "players": {
    "DemoPlayer1": {
      "name": "DemoPlayer1",
      "status": "active",
      "point": 19800,
      "round": {
        "betPoint": 0,
        "first": 0,
        "second": 0,
        "cards": [
          {
            "suit": "Hearts",
            "number": 3
          },
          {
            "suit": "Diamonds",
            "number": 4
          },
          {
            "suit": "Hearts",
            "number": 13
          },
          {
            "suit": "Spades",
            "number": 13
          },
          {
            "suit": "Clubs",
            "number": 1
          }
        ],
        "action": null
      }
    }
    // (中略)
  }
}
```

#### 戻り値 <!-- omit in toc -->

```typescript
return 0;
```

#### ポイント <!-- omit in toc -->

1. 引数
   1. `minBetPoint`が `0`
1. 戻り値
   1. `0`を返却する

`minBetPoint`が `0` であるということは、参加フィー以外のポイントをまだ誰も支払っていない状況。
この時、戻り値として`0`を返却すると、賭けポイントを追加しないため **「チェック」** を宣言したことになる。

![チェック](./img/check.png 'チェック')

### ベット

#### 引数 <!-- omit in toc -->

```json
{
  // (中略)
  "phase": "bet-1",
  "pot": 800,
  "minBetPoint": 0,
  "players": {
    "DemoPlayer1": {
      "name": "DemoPlayer1",
      "status": "active",
      "point": 19800,
      "round": {
        "betPoint": 0,
        "first": 0,
        "second": 0,
        "cards": [
          {
            "suit": "Spades",
            "number": 3
          },
          {
            "suit": "Diamonds",
            "number": 6
          },
          {
            "suit": "Hearts",
            "number": 8
          },
          {
            "suit": "Diamonds",
            "number": 11
          },
          {
            "suit": "Hearts",
            "number": 12
          }
        ],
        "action": null
      }
    }
    // (中略)
  }
}
```

#### 戻り値 <!-- omit in toc -->

```typescript
return 345;
```

#### ポイント <!-- omit in toc -->

1. 引数
   1. `minBetPoint`が `0`
1. 戻り値
   1. `正の値`を返却する

`minBetPoint`が `0` であるということは、参加フィー以外のポイントをまだ誰も支払っていない状況。
この時、戻り値として`正の値`を返却すると、初めて賭けポイント追加したため **「ベット」** を宣言したことになる。

![ベット](./img/bet.png 'ベット')

### コール

#### 引数 <!-- omit in toc -->

```json
{
  // (中略)
  "phase": "bet-1",
  "pot": 1544,
  "minBetPoint": 248,
  "players": {
    "DemoPlayer1": {
      "name": "DemoPlayer1",
      "status": "active",
      "point": 19800,
      "round": {
        "betPoint": 0,
        "first": 0,
        "second": 0,
        "cards": [
          {
            "suit": "Hearts",
            "number": 3
          },
          {
            "suit": "Diamonds",
            "number": 4
          },
          {
            "suit": "Hearts",
            "number": 13
          },
          {
            "suit": "Spades",
            "number": 13
          },
          {
            "suit": "Clubs",
            "number": 1
          }
        ],
        "action": null
      }
    }
    // (中略)
  }
}
```

#### 戻り値 <!-- omit in toc -->

```typescript
return 0;
```

#### ポイント <!-- omit in toc -->

1. 引数
   1. `minBetPoint`が `1以上の値`
1. 戻り値
   1. `0`を返却する

`minBetPoint`が `1以上の値` であるということは、既に 1 人以上のプレイヤーがポイントを賭けた状態。
この時、戻り値として`0`を返却すると、賭けポイントを追加しないため **「コール」** を宣言したことになる。

![コール](./img/call.png 'コール')

### レイズ

#### 引数 <!-- omit in toc -->

```json
{
  // (中略)
  "phase": "bet-2",
  "pot": 1792,
  "minBetPoint": 248,
  "players": {
    "DemoPlayer1": {
      "name": "DemoPlayer1",
      "status": "active",
      "point": 19552,
      "round": {
        "betPoint": 248,
        "first": 248,
        "second": 0,
        "cards": [
          {
            "suit": "Hearts",
            "number": 3
          },
          {
            "suit": "Clubs",
            "number": 5
          }
          {
            "suit": "Diamonds",
            "number": 7
          },
          {
            "suit": "Hearts",
            "number": 13
          },
          {
            "suit": "Spades",
            "number": 13
          }
        ],
        "action": null
      }
    }
    // (中略)
  }
}
```

#### 戻り値 <!-- omit in toc -->

```typescript
return 395;
```

#### ポイント <!-- omit in toc -->

1. 引数
   1. `minBetPoint`が `1以上の値`
1. 戻り値
   1. `正の値`を返却する

`minBetPoint`が `1以上の値` であるということは、既に 1 人以上のプレイヤーがポイントを賭けた状態。
この時、戻り値として`正の値`を返却すると、初めて賭けポイント追加したため **「レイズ」** を宣言したことになる。

![レイズ](./img/raise.png 'レイズ')

### ドロップ

#### 引数 <!-- omit in toc -->

```json
{
  // (中略)
  "phase": "bet-2",
  "pot": 1648,
  "minBetPoint": 213,
  "players": {
    "DemoPlayer1": {
      "name": "DemoPlayer1",
      "status": "active",
      "point": 19588,
      "round": {
        "betPoint": 212,
        "first": 212,
        "second": 0,
        "cards": [
          {
            "suit": "Diamonds",
            "number": 3
          },
          {
            "suit": "Clubs",
            "number": 6
          }
          {
            "suit": "Clubs",
            "number": 9
          },
          {
            "suit": "Hearts",
            "number": 12
          },
          {
            "suit": "Diamonds",
            "number": 13
          }
        ],
        "action": null
      }
    }
    // (中略)
  }
}
```

#### 戻り値 <!-- omit in toc -->

```typescript
return -1;
```

#### ポイント <!-- omit in toc -->

1. 戻り値
   1. `負の値`を返却する

`minBetPoint`が `1以上の値` であるということは、既に 1 人以上のプレイヤーがポイントを賭けた状態。
この時、戻り値として`負の値`を返却すると、 **「ドロップ」** を宣言したことになる。

![ドロップ](./img/drop.png 'ドロップ')

### オール・イン

#### 引数 <!-- omit in toc -->

```json
{
  // (中略)
  "phase": "bet-1",
  "pot": 978,
  "minBetPoint": 0,
  "players": {
    "DemoPlayer1": {
      "name": "DemoPlayer1",
      "status": "active",
      "point": 178,
      "round": {
        "betPoint": 0,
        "first": 0,
        "second": 0,
        "cards": [
          {
            "suit": "Clubs",
            "number": 2
          },
          {
            "suit": "Clubs",
            "number": 4
          }
          {
            "suit": "Spades",
            "number": 5
          },
          {
            "suit": "Clubs",
            "number": 6
          },
          {
            "suit": "Diamonds",
            "number": 10
          }
        ],
        "action": null
      }
    }
    // (中略)
  }
}
```

#### 戻り値 <!-- omit in toc -->

```typescript
return 178;
```

#### ポイント <!-- omit in toc -->

1. 戻り値
   1. `所持ポイント以上の値`を返却する

戻り値として`所持ポイント以上の値`を返却すると、 **「オール・イン」** を宣言したことになる。

![オール・イン](./img/all-in.png 'オール・イン')

## ドローフェーズ

### 交換無し

#### 引数 <!-- omit in toc -->

```json
{
  // (中略)
  "phase": "draw-2",
  "pot": 978,
  "minBetPoint": 0,
  "players": {
    "DemoPlayer1": {
      "name": "DemoPlayer1",
      "status": "active",
      "point": 10020,
      "round": {
        "betPoint": 2345,
        "first": 241,
        "second": 2104,
        "cards": [
          {
            "suit": "Clubs",
            "number": 3
          },
          {
            "suit": "Clubs",
            "number": 5
          }
          {
            "suit": "Diamonds",
            "number": 8
          },
          {
            "suit": "Clubs",
            "number": 9
          },
          {
            "suit": "Diamonds",
            "number": 10
          }
        ],
        "action": "call"
      }
    }
    // (中略)
  }
}
```

#### 戻り値 <!-- omit in toc -->

```typescript
return [false, false, false, false, false];
```

#### ポイント <!-- omit in toc -->

1. 戻り値
   1. 全てのが`false`の配列

戻り値として全てのが`false`の配列を返却すると、 **「交換を行わない」** 。

![交換無し](./img/no-change.png '交換無し')

### 交換あり

#### 引数 <!-- omit in toc -->

```json
{
  // (中略)
  "phase": "draw-2",
  "pot": 978,
  "minBetPoint": 0,
  "players": {
    "DemoPlayer1": {
      "name": "DemoPlayer1",
      "status": "active",
      "point": 17660,
      "round": {
        "betPoint": 2140,
        "first": 412,
        "second": 1728,
        "cards": [
          {
            "suit": "Diamonds",
            "number": 3
          },
          {
            "suit": "Diamonds",
            "number": 7
          }
          {
            "suit": "Clubs",
            "number": 8
          },
          {
            "suit": "Clubs",
            "number": 9
          },
          {
            "suit": "Spades",
            "number": 9
          }
        ],
        "action": "call"
      }
    }
    // (中略)
  }
}
```

#### 戻り値 <!-- omit in toc -->

```typescript
return [true, true, false, true, false];
```

#### ポイント <!-- omit in toc -->

1. 戻り値
   1. `true`を含む配列

戻り値として`true`を含む配列を返却すると、 `true`で **「指定した箇所だけ交換する」** 。
例では、1, 2, 4 枚目のカードが交換される。

![交換あり](./img/change.png '交換あり')
