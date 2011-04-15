Ext.ns("Tridex.plugins");

Tridex.plugins.NestedLayerTree = Ext.extend(gxp.plugins.LayerTree, {

    /** api: ptype = app_nestedlayertree */
    ptype: "app_nestedlayertree",

    createGroup: function(text, groupCode) {
        return {
            text: text,
            expanded: true,
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
        var treeRoot = new Ext.tree.TreeNode({
            text: this.rootNodeText,
            expanded: true,
            isTarget: false,
            allowDrop: false
        });
        treeRoot.appendChild({text: "Province: de l' Estuaire", expanded: true,
            children: [
                this.createGroup("Infrastructure", "P1"),
                this.createGroup("Les Détails Des Terres", "P2"),
                this.createGroup("Frontières", "P3"),
                this.createGroup("Point d'intérêt", "P4")
            ]
        });
        treeRoot.appendChild({text: "Pays: Gabon", expanded: true,
            children: [
                this.createGroup("Infrastructure", "C1"),
                this.createGroup("Les Détails Des Terres", "C2"),
                this.createGroup("Frontières", "C3"),
                this.createGroup("Point d'intérêt", "C4")
            ]
        });

        config = Ext.apply({
            xtype: "treepanel",
            root: treeRoot,
            rootVisible: false,
            border: false,
            enableDD: true,
        }, config || {});

        var layerTree = gxp.plugins.LayerTree.superclass.addOutput.call(this, config);
        return layerTree;
    }

});

Ext.preg(Tridex.plugins.NestedLayerTree.prototype.ptype, Tridex.plugins.NestedLayerTree);
