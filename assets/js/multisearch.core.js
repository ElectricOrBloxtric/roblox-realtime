YT.multisearch = {
  getResults: function (query) {
    YT.robloxApi.searchGroups(query)
      .then(data => {
        $("#results").empty();
        (data.data || []).forEach(g => this.fetchDetails(g.id));
      })
      .catch(error => {
        console.error("Error searching groups:", error);
        $("#results").empty();
      });
  },

  fetchDetails: function (groupId) {
    YT.robloxApi.getGroupData(groupId)
      .then(groupData => {
        $("#results").append(
          YT.multisearch.makeHtml(groupData.name, groupData.icon, groupId)
        );
      })
      .catch(error => {
        console.error("Error fetching group details:", error);
      });
  },

  makeHtml: function (name, imageUrl, id) {
    const $icon = $("<div>", {
      class: "round align-self-center",
      style: `background:url('${imageUrl}') center/cover`
    });
    const $label = $("<h3>", { class: "m-b-0 font-light" }).text(name);
    const $info = $("<div>", { class: "m-l-10 align-self-center" })
      .append($label);
    return $("<div>", { class: "card-block card m-b-15" })
      .append($("<div>", { class: "d-flex flex-row" })
        .append($icon).append($info)
      )
      .on("click", () => {
        window.open(`#!/${id}`);
        this.reset();
      });
  },

  reset: function () {
    $(".super-search,.dark-bg").fadeOut(400, () => {
      $("#results").empty();
      $("#yt_searchvalue_m").val("");
    });
  },

  bind: function () {
    $("#yt_comrest").on("click", this.reset.bind(this));
    $("#yt_search_m").on("submit", (e) => {
      e.preventDefault();
      this.getResults($("#yt_searchvalue_m").val());
    });
    $("#yt_searchbutton_m").on("click", (e) => {
      e.preventDefault();
      this.getResults($("#yt_searchvalue_m").val());
    });
  }
};