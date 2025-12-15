


function objectAnalyzer(data) {
  let structure = {
    depth: 0,
    totalKeys: 0,
    arrayCount: 0,
    objectCount: 0,
    primitiveCount: 0
  };

  let flattened = {};

  // ===============================
  // Helper: traverse & analyze
  // ===============================
  function traverse(value, currentDepth, path) {
    structure.depth = Math.max(structure.depth, currentDepth);

    if (Array.isArray(value)) {
      structure.arrayCount++;
      structure.totalKeys += value.length;

      for (let i = 0; i < value.length; i++) {
        traverse(value[i], currentDepth + 1, `${path}.${i}`);
      }
    }
    else if (typeof value === "object" && value !== null) {
      structure.objectCount++;
      const keys = Object.keys(value);
      structure.totalKeys += keys.length;

      for (let key in value) {
        traverse(value[key], currentDepth + 1, path ? `${path}.${key}` : key);
      }
    }
    else {
      structure.primitiveCount++;
      if (path) {
        flattened[path] = value;
      }
    }
  }

  traverse(data, 1, "");

  // ===============================
  // Custom domain analysis
  // ===============================
  let usersAnalysis = {
    count: data.users.length,
    totalPosts: 0,
    totalLikes: 0,
    averageLikes: 0
  };

  for (let i = 0; i < data.users.length; i++) {
    let posts = data.users[i].posts;
    usersAnalysis.totalPosts += posts.length;

    for (let j = 0; j < posts.length; j++) {
      usersAnalysis.totalLikes += posts[j].likes;
    }
  }

  usersAnalysis.averageLikes =
    usersAnalysis.totalPosts === 0
      ? 0
      : usersAnalysis.totalLikes / usersAnalysis.totalPosts;

  let enabledFeatures = [];
  let disabledFeatures = [];

  for (let key in data.settings.notifications) {
    if (data.settings.notifications[key]) {
      enabledFeatures.push(key);
    } else {
      disabledFeatures.push(key);
    }
  }

  // ===============================
  // Return final analysis
  // ===============================
  return {
    structure: structure,
    analysis: {
      users: usersAnalysis,
      settings: {
        enabledFeatures: enabledFeatures,
        disabledFeatures: disabledFeatures
      }
    },
    flattened: flattened
  };
}


let complexData = {
  users: [
    { id: 1, name: "Alice", posts: [{ title: "Hello", likes: 10 }] },
    { id: 2, name: "Bob", posts: [{ title: "World", likes: 5 }, { title: "Test", likes: 15 }] }
  ],
  settings: {
    theme: "dark",
    notifications: { email: true, push: false }
  },
  metadata: {
    version: "1.0",
    lastUpdated: "2023-01-01"
  }
};

console.log(objectAnalyzer(complexData));
