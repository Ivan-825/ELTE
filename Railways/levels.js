/*
0 = empty
1 = oasis
21 = mountain 0° rotation
22 = mountain 90° rotation
23 = mountain 180° rotation
24 = mountain 270° rotation
3 = bridge 0° rotation
4 = bridge 90° rotation
*/


e1 = [
    [0, 22, 0, 0, 1],
    [0, 0, 0, 3, 1],
    [3, 0, 23, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 24, 0, 0]
];

e2 = [
    [1, 0, 4, 0, 0],
    [0, 23, 0, 0, 23],
    [3, 1, 24, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0]
];

e3 = [
    [0, 0, 4, 0, 0],
    [0, 0, 0, 0, 3],
    [0, 23, 3, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 4, 0, 0, 23]
];

e4 = [
    [0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0],
    [3, 0, 22, 0, 22],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 24, 0]
]

e5 = [
    [0, 0, 4, 0, 0],
    [0, 21, 0, 0, 0],
    [3, 0, 0, 24, 0],
    [0, 0, 3, 1, 0],
    [0, 23, 0, 0, 0]
];

d1 = [
    [0, 22, 1, 1, 0, 4, 0],
    [3, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 24, 0, 0, 0],
    [24, 0, 22, 0, 4, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0]
];

d2 = [
    [0, 0, 1, 0, 0, 0, 0],
    [3, 0, 4, 0, 0, 23, 0],
    [0, 0, 4, 0, 0, 0, 3],
    [21, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 22, 0, 0, 0],
    [0, 21, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0]
];

d3 = [
    [0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 3],
    [1, 0, 24, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 24, 0, 4, 0, 0],
    [3, 0, 0, 0, 0, 22, 0],
    [0, 0, 1, 24, 0, 0, 0]
];

d4 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 23, 0],
    [0, 0, 24, 0, 0, 0, 0],
    [0, 4, 0, 1, 0, 4, 0],
    [0, 0, 23, 0, 22, 0, 0],
    [3, 0, 0, 0, 0, 24, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

d5 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 21, 0],
    [0, 4, 4, 0, 22, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 21, 0, 1, 0, 0],
    [0, 23, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];