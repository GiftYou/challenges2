
function extractUserData(data){
    const { id: userId, profile, preferences} = data

    return {
        userId,
        fullName: profile.name,
        email:profile.email,
        location: `${profile.address.street} ${profile.address.city} ${profile. address.zipCode}`,
        settings: {theme: preferences.theme,
            language: preferences.language
        } , 
        isComplete: true
    }
}


let user = {
  id: 1,
  profile: {
    name: "John Doe",
    email: "john@example.com",
    address: {
      street: "Jl. Sudirman",
      city: "Jakarta",
      zipCode: "12345"
    }
  },
  preferences: {
    theme: "dark",
    language: "id"
  }
};

console.log(extractUserData(user));
