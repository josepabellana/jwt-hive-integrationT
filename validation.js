(function () {
  amp.plugin("jwt", async function (options) {
    let player = this;
    var init = function () {
      console.log("plugin jwt initialized with player ", player);
    };
    fetch("http://localhost:3001/jwtHive");

    const hivePluginOptions = {
        debugLevel: "debug",
        hiveTechOrder: ["HiveJava", "HiveJS", "StatsJS"],
        playerName: "microsoft",
        playerVersion: "",
      };
    const plugin = new HiveHtml5(player, hivePluginOptions);

    plugin
      .initSession({
        jwt: jwt,
        videoId: videoId,
        manifest: manifests[0],
      })
      .then((session) => {
        enableHiveXhr(plugin, player);
        // load player source according to player API
        player.load(session.manifest);
      });

    init();
  });
}.call(this));
