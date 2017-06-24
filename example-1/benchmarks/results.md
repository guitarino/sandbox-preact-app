Here's the results of the benchmark operating on a tree of 11015 elements (in comparison, outlook has ~5500)

| What                    | My state management | Redux state management |
|-------------------------|---------------------|------------------------|
| Generation and mounting | 213ms               | 351ms                  |
| Big change (most nodes) | 104ms               | 135ms                  |
| Small change (one node) | 60ms                | 8ms                    |

Takeaway is that redux is way better (~10x) at small changes, but worse (~2x) at big state changes. However, it's likely that you won't have such a big DOM tree, so the updates should be much faster.

When realistic number of elements used (~1100), the small change with `my state management` is still within reasonable 20ms in Chrome (in other browsers it's slow unfortunately).

Needs more consideration.