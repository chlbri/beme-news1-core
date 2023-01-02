
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.fetchArticles": { type: "done.invoke.fetchArticles"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.table": { type: "done.invoke.table"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.fetchArticles": { type: "error.platform.fetchArticles"; data: unknown };
"error.platform.table": { type: "error.platform.table"; data: unknown };
"xstate.after(THROTTLE_TIME)#main.work.search.active.idle": { type: "xstate.after(THROTTLE_TIME)#main.work.search.active.idle" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "fetchArticles": "done.invoke.fetchArticles";
"table": "done.invoke.table";
        };
        missingImplementations: {
          actions: "buildHistory" | "navigation/back" | "navigation/push" | "navigation/replace";
          delays: "THROTTLE_TIME";
          guards: never;
          services: "fetchArticles" | "table";
        };
        eventsCausingActions: {
          "buildHistory": "NAVIGATE/BACK" | "NAVIGATE/PUSH" | "NAVIGATE/REPLACE";
"defaultQuery": "xstate.init";
"navigation/back": "NAVIGATE/BACK";
"navigation/push": "NAVIGATE/PUSH";
"navigation/replace": "NAVIGATE/REPLACE";
"search/query": "SEARCH/QUERY";
"search/setInput": "SEARCH/INPUT";
"setArticles": "TABLE/SET/ARTICLES" | "done.invoke.fetchArticles";
"setDefaultArticles": "done.invoke.fetchArticles";
"table/assignDefaultPageSize": "done.invoke.fetchArticles" | "error.platform.fetchArticles";
"table/create": "TABLE/SEND/CREATE";
"table/delete": "TABLE/SEND/DELETE";
"table/goto": "TABLE/SEND/GOTO";
"table/next": "TABLE/SEND/NEXT";
"table/previous": "TABLE/SEND/PREVIOUS";
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
          "THROTTLE_TIME": "" | "done.invoke.fetchArticles" | "error.platform.fetchArticles";
        };
        eventsCausingGuards: {
          "hasInput": "";
        };
        eventsCausingServices: {
          "fetchArticles": "xstate.after(THROTTLE_TIME)#main.work.search.active.idle" | "xstate.init";
"table": "done.invoke.fetchArticles" | "error.platform.fetchArticles";
        };
        matchesStates: "cache" | "work" | "work.navigation" | "work.search" | "work.search.active" | "work.search.active.idle" | "work.search.active.loading" | "work.search.checking" | "work.search.inactive" | "work.table" | { "work"?: "navigation" | "search" | "table" | { "search"?: "active" | "checking" | "inactive" | { "active"?: "idle" | "loading"; }; }; };
        tags: never;
      }
  