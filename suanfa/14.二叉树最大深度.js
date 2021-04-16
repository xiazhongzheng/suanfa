let root = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
            rigth: {
                value: 6
            }
        }
    },
    rigth: {
        value: 3,
        rigth: {
            value: 5
        }
    }
};
// 1. 二叉树的最大深度
// 递归
const maxDepth = (node) => {
    if (node) {
        return Math.max(maxDepth(node.left), maxDepth(node.rigth)) + 1;
    } else {
        return 0
    }
}

console.log(maxDepth(root));


// 2. 最大二叉树   给定一个数组，二叉树的根是数组中的最大元素，左子树是通过数组中最大值左边部分构造的最大二叉树，右子树是通过数组中最大值右边部分构造的最大二叉树
const arr = [2, 3, 6, 4, 9, 7, 2, 3, 4];
const maxTree = (arr) => {
    if (!(arr && arr.length)) {
        return;
    }
    let max = Math.max(...arr);
    let index = arr.indexOf(max);
    let leftArr = arr.slice(0, index);
    let rigthArr = arr.slice(index + 1);

    let root = {
        value: max,
        left: maxTree(leftArr),
        rigth: maxTree(rigthArr)
    }

    return root;
}

console.log(maxTree(arr));

// 3. 验证二叉查找树
// 判断一个二叉树是不是有效的二叉查找树，即节点的左子树都小于当前节点，节点的右子树都大于当前节点，左右子树也是二叉查找树
const isValidBST = (root) => {
    if(!root) {
        // 递归到最后，返回true
        return true;
    }
    let left = root.left;
    let rigth = root.rigth;
    let val =  root.value;
    if ((left && val <= left.value) || (rigth && val >= rigth.value)) {
        return false;
    }
    let leftResult = isValidBST(left);
    let rigthResult = isValidBST(rigth);
    if (leftResult && rigthResult) {
        return true
    } else {
        return false;
    }
}
console.log(isValidBST(root));
let root1 = {
    value: 5,
    left: {
        value: 3,
        left: {
            value: 2,
            rigth: {
                value: 3
            }
        }
    },
    rigth: {
        value: 7,
        rigth: {
            value: 8
        }
    }
};
console.log(isValidBST(root1));
