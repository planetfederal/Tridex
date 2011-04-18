Ext.ns("Tridex.plugins");

Tridex.plugins.NestedLayerTree = Ext.extend(gxp.plugins.LayerTree, {

    /** api: ptype = app_nestedlayertree */
    ptype: "app_nestedlayertree",

    /** api: config[groupConfig]
     *  ``Array``
     *  Configuration for the nested structure. The array containts objects
     *  with a title and a children property. The children are objects with
     *  a title and a name.
     */
    groupConfig: null,

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
        var overlays = root.childNodes[0];
        var baseLayers = root.childNodes[1];
        root.removeChild(overlays);
        for (var i=0, ii=this.groupConfig.length; i<ii; ++i) {
            var group = this.groupConfig[i];
            var node = new Ext.tree.TreeNode({
                text: group.title,
                expanded: true
            });
            for (var j=0, jj=group.children.length; j<jj; ++j) {
                node.appendChild(this.createGroup(group.children[j].title, group.children[j].name));
            }
            root.insertBefore(node, baseLayers);
        }
        return treePanel;
    }

});

Ext.preg(Tridex.plugins.NestedLayerTree.prototype.ptype, Tridex.plugins.NestedLayerTree);
