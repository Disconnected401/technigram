server_adress = "https://technigram.onrender.com";
document
  .querySelector("#addPostForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    const errorDiv = document.querySelector("#error");

    try {
      const currentUserData = localStorage.getItem("currentUser");
      if (!currentUserData) {
        throw new Error("User not logged in");
      }

      const currentUser = JSON.parse(currentUserData);
      const creatorId = currentUser.id;
      const token = currentUser.token;
      const response = await fetch(server_adress, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
        body: JSON.stringify({
          creator_id: creatorId,
          title: title,
          content: content,
        }),
      });

      // Log the response for debugging
      console.log("Server response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData); // Log detailed error response
        throw new Error(
          `HTTP error! Status: ${response.status} - ${errorData.message}`
        );
      }

      const newPost = await response.json();
      console.log("Added new post:", newPost);

      window.location.replace("https://technigram.onrender.com/index.html");
    } catch (error) {
      console.error("Error adding post:", error); // More detailed logging
      errorDiv.textContent = `Failed to add post: ${error.message}`;
    }
  });
