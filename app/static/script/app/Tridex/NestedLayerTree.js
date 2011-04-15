Ext.ns("Tridex.plugins");

Tridex.plugins.NestedLayerTree = Ext.extend(gxp.plugins.LayerTree, {

    /** api: ptype = app_nestedlayertree */
    ptype: "app_nestedlayertree",

    createGroup: function(text, groupCode) {
        return {
            text: text,
            expanded: true,
            iconCls: "gxp-folder",
            nodeType: 'gx_layercontainer', 
            loader: new GeoExt.tree.LayerLoader({
                store: this.target.mapPanel.layers,
                filter: function(record) {
                    return record.get("group") == groupCode;
                }
            })
        };
    },

    addOutput: function(config) {
        var treePanel = Tridex.plugins.NestedLayerTree.superclass.addOutput.call(this, arguments);
        treePanel.enableDD = false;
        var root = treePanel.getRootNode();
        var node1 = new Ext.tree.TreeNode({
            text: "Province: de l' Estuaire",
            expanded: true
        });
        node1.appendChild(this.createGroup("Infrastructure", "P1"));
        node1.appendChild(this.createGroup("Les Détails Des Terres", "P2"));
        node1.appendChild(this.createGroup("Frontières", "P3"));
        node1.appendChild(this.createGroup("Point d'intérêt", "P4"));
        var node2 = new Ext.tree.TreeNode({
            text: "Pays: Gabon",
            expanded: true
        });
        node2.appendChild(this.createGroup("Infrastructure", "C1"));
        node2.appendChild(this.createGroup("Les Détails Des Terres", "C2"));
        node2.appendChild(this.createGroup("Frontières", "C3"));
        node2.appendChild(this.createGroup("Point d'intérêt", "C4"));
        var overlays = root.childNodes[0];
        var baseLayers = root.childNodes[1];
        root.removeChild(overlays);
        root.insertBefore(node1, baseLayers);
        root.insertBefore(node2, baseLayers);
        return treePanel;
    }

});

Ext.preg(Tridex.plugins.NestedLayerTree.prototype.ptype, Tridex.plugins.NestedLayerTree);
