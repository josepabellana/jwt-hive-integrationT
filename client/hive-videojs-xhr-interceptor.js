let originalXhrRequest = null;

function enableHiveXhr(plugin, player) {
  if (originalXhrRequest !== null) this.disableHiveXhr(player);

  originalXhrRequest = player.xhr.XMLHttpRequest;
  player.xhr.XMLHttpRequest = function () {
    return plugin.createXMLHttpRequest();
  };
}

function getCaptionLanguage() {
  return (
    Array.from(this.player.textTracks().tracks_).find(
      (textTrack) => textTrack.mode === "showing"
    )?.language || null
  );
}

// function getTextTracks() {
//   const textTracks = toHiveTextTrackList(this.player.textTracks().tracks_);
//   this.plugin.logger().debug("getTextTracks", textTracks);
//   return textTracks;
// }

function bindEventHandlers(plugin) {
  plugin.registerEvent(this.player.textTracks(), "onCaptionChange");
  plugin.getCaptionLanguage = this.getCaptionLanguage.bind(this);
  plugin.getTextTracks = this.getTextTracks.bind(this);
}

function enableHiveModules(plugin, player) {
  this.enableHiveXhr(plugin, player);
  this.bindEventHandlers(plugin);
}

function disableHiveXhr(player) {
  player.xhr.XMLHttpRequest = originalXhrRequest;
  originalXhrRequest = null;
}
