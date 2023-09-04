"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMenuTree = void 0;
//
const buildMenuTree = (menus, parentId) => {
    const result = [];
    for (const menu of menus) {
        if (menu.parentId === parentId) {
            menu.children = (0, exports.buildMenuTree)(menus, menu.id);
            result.push(menu);
        }
    }
    return result;
};
exports.buildMenuTree = buildMenuTree;
//# sourceMappingURL=buildMenuTree.js.map