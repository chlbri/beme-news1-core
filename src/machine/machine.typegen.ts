
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.fetchNews": { type: "done.invoke.fetchNews"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.fetchNews": { type: "error.platform.fetchNews"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "fetchNews": "done.invoke.fetchNews";
        };
        missingImplementations: {
          actions: "forwardDefaultQuery" | "forwardQuery" | "setInput" | "setNews";
          delays: never;
          guards: "hasInput";
          services: "fetchNews";
        };
        eventsCausingActions: {
          "forwardDefaultQuery": "xstate.init";
"forwardQuery": "QUERY";
"setInput": "INPUT";
"setNews": "done.invoke.fetchNews";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "hasInput": "";
        };
        eventsCausingServices: {
          "fetchNews": "" | "xstate.init";
        };
        matchesStates: "cache" | "work" | "work.search" | "work.search.active" | "work.search.active.idle" | "work.search.active.loading" | "work.search.checking" | "work.search.inactive" | { "work"?: "search" | { "search"?: "active" | "checking" | "inactive" | { "active"?: "idle" | "loading"; }; }; };
        tags: never;
      }
  