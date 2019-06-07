const SquareConnect = require('square-connect');

exports.sourceNodes = async (
  { actions, createContentDigest, },
  configOptions
  ) => {
  const { createNode } = actions

  const defaultClient = SquareConnect.ApiClient.instance;

  const oauth2 = defaultClient.authentications['oauth2'];
  oauth2.accessToken = configOptions.accessToken;

  delete configOptions.plugins

  const catalogApi = new SquareConnect.CatalogApi();

  const catalog = await catalogApi.listCatalog();
  catalog.objects.forEach((item)=>{
    const { item_data } = item;
    createNode({
      ...item,
      ...item_data,
      variations: item_data.variations.map((variant)=>{
          const { item_variation_data } = variant;
          return {
            ...variant,
            ...item_variation_data
          };
      }),
      id: `${item.id}`,
      parent: null,
      children: [],
      internal: {
        type: `SquareCatalogItem`,
        content: JSON.stringify(item),
        contentDigest: createContentDigest(item)
      }
    })
  })
}