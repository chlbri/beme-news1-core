
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.fetchArticles": { type: "done.invoke.fetchArticles"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.getArticles": { type: "done.invoke.getArticles"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.table": { type: "done.invoke.table"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.fetchArticles": { type: "error.platform.fetchArticles"; data: unknown };
"error.platform.getArticles": { type: "error.platform.getArticles"; data: unknown };
"error.platform.table": { type: "error.platform.table"; data: unknown };
"xstate.after(THROTTLE_TIME)#main.work.search.active.busy": { type: "xstate.after(THROTTLE_TIME)#main.work.search.active.busy" };
"xstate.after(THROTTLE_TIME)#main.work.table.busy": { type: "xstate.after(THROTTLE_TIME)#main.work.table.busy" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "fetchArticles": "done.invoke.fetchArticles";
"getArticles": "done.invoke.getArticles";
"table": "done.invoke.table";
        };
        missingImplementations: {
          actions: "buildHistory" | "logFetchError" | "logLocalFetchError" | "navigation/back" | "navigation/push" | "navigation/replace";
          delays: never;
          guards: never;
          services: "fetchArticles" | "getArticles" | "table";
        };
        eventsCausingActions: {
          "buildHistory": "NAVIGATE/BACK" | "NAVIGATE/PUSH" | "NAVIGATE/REPLACE";
"defaultQuery": "done.invoke.getArticles" | "error.platform.getArticles";
"logFetchError": "error.platform.fetchArticles";
"logLocalFetchError": "error.platform.getArticles";
"navigation/back": "NAVIGATE/BACK";
"navigation/push": "NAVIGATE/PUSH";
"navigation/replace": "NAVIGATE/REPLACE";
"search/query": "SEARCH/QUERY";
"search/setInput": "SEARCH/INPUT";
"setArticles": "TABLE/SET/ARTICLES" | "done.invoke.fetchArticles" | "done.invoke.getArticles";
"setDefaultArticles": "done.invoke.fetchArticles" | "done.invoke.getArticles";
"table/assignDefaultPageSize": "done.invoke.fetchArticles" | "done.invoke.getArticles" | "error.platform.fetchArticles";
"table/changePageSize": "TABLE/SEND/CHANGE_PAGE_SIZE";
"table/create": "TABLE/SEND/CREATE";
"table/delete": "TABLE/SEND/DELETE";
"table/goto": "TABLE/SEND/GOTO";
"table/gotoFirst": "TABLE/SEND/FIRST_PAGE";
"table/gotoLast": "TABLE/SEND/LAST_PAGE";
"table/next": "TABLE/SEND/NEXT_PAGE";
"table/previous": "TABLE/SEND/PREVIOUS_PAGE";
"table/remove": "TABLE/SEND/REMOVE";
"table/setAllTotal": "TABLE/SET/ARTICLES";
"table/setCanFetchMore": "TABLE/SET/ARTICLES" | "TABLE/SET/CURRENT_PAGE" | "TABLE/SET/PAGE_SIZE";
"table/setCurrentPage": "TABLE/SET/CURRENT_PAGE";
"table/setHasNextPage": "TABLE/SET/ARTICLES" | "TABLE/SET/CURRENT_PAGE" | "TABLE/SET/PAGE_SIZE";
"table/setHasPreviousPage": "TABLE/SET/ARTICLES" | "TABLE/SET/CURRENT_PAGE" | "TABLE/SET/PAGE_SIZE";
"table/setPageSize": "TABLE/SET/PAGE_SIZE";
"table/setTotal": "TABLE/SET/ARTICLES";
"table/setTotalPages": "TABLE/SET/ARTICLES" | "TABLE/SET/PAGE_SIZE";
"table/sort": "TABLE/SEND/SORT";
"table/update": "TABLE/SEND/UPDATE";
        };
        eventsCausingDelays: {
          "THROTTLE_TIME": "TABLE/SEND/CHANGE_PAGE_SIZE" | "TABLE/SEND/CREATE" | "TABLE/SEND/DELETE" | "TABLE/SEND/FIRST_PAGE" | "TABLE/SEND/GOTO" | "TABLE/SEND/LAST_PAGE" | "TABLE/SEND/NEXT_PAGE" | "TABLE/SEND/PREVIOUS_PAGE" | "TABLE/SEND/REMOVE" | "TABLE/SEND/SORT" | "TABLE/SEND/UPDATE" | "done.invoke.fetchArticles" | "done.invoke.getArticles" | "error.platform.fetchArticles";
        };
        eventsCausingGuards: {
          "hasArticles": "done.invoke.getArticles";
"hasInput": "";
        };
        eventsCausingServices: {
          "fetchArticles": "" | "done.invoke.getArticles" | "error.platform.getArticles";
"getArticles": "xstate.init";
"table": "done.invoke.fetchArticles" | "done.invoke.getArticles" | "error.platform.fetchArticles";
        };
        matchesStates: "cache" | "cache.fetch" | "cache.local" | "work" | "work.navigation" | "work.search" | "work.search.active" | "work.search.active.busy" | "work.search.active.idle" | "work.search.active.loading" | "work.search.checking" | "work.search.inactive" | "work.table" | "work.table.busy" | "work.table.ready" | { "cache"?: "fetch" | "local";
"work"?: "navigation" | "search" | "table" | { "search"?: "active" | "checking" | "inactive" | { "active"?: "busy" | "idle" | "loading"; };
"table"?: "busy" | "ready"; }; };
        tags: never;
      }
  