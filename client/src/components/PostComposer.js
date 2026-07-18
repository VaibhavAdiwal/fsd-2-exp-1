import React, { useState } from "react";
import axios from "axios";

function PostComposer() {
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [message, setMessage] = useState("");

  // Platform character limits
  const twitterLimit = 280;
  const instagramLimit = 2200;
  const facebookLimit = 63206;

  // Handle checkbox selection
  const handlePlatform = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setPlatforms([...platforms, value]);
    } else {
      setPlatforms(platforms.filter((item) => item !== value));
    }
  };

  // Save Post
  const savePost = async () => {
    // Validation
    if (platforms.length === 0) {
      setMessage("Please select at least one platform.");
      return;
    }

    if (content.trim() === "") {
      setMessage("Post content cannot be empty.");
      return;
    }

    if (platforms.includes("Twitter") && content.length > twitterLimit) {
      setMessage("Twitter character limit exceeded.");
      return;
    }

    if (platforms.includes("Instagram") && content.length > instagramLimit) {
      setMessage("Instagram character limit exceeded.");
      return;
    }

    if (platforms.includes("Facebook") && content.length > facebookLimit) {
      setMessage("Facebook character limit exceeded.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/posts", {
        content,
        platforms,
        image: "",
      });

      setMessage("✅ Post Saved Successfully!");

      setContent("");
      setPlatforms([]);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
      }

      setMessage("❌ Error Saving Post");
    }
  };

  return (
    <div className="container">
      <h1>Social Media Post Composer</h1>

      <textarea
        placeholder="Write your post here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className="counter">
        Characters: <strong>{content.length}</strong>
      </div>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            value="Facebook"
            checked={platforms.includes("Facebook")}
            onChange={handlePlatform}
          />
          Facebook
        </label>

        <label>
          <input
            type="checkbox"
            value="Instagram"
            checked={platforms.includes("Instagram")}
            onChange={handlePlatform}
          />
          Instagram
        </label>

        <label>
          <input
            type="checkbox"
            value="Twitter"
            checked={platforms.includes("Twitter")}
            onChange={handlePlatform}
          />
          Twitter
        </label>
      </div>

      {/* Validation Messages */}

      {platforms.includes("Twitter") && content.length > twitterLimit && (
        <p className="error">
          ❌ Twitter supports only {twitterLimit} characters.
        </p>
      )}

      {platforms.includes("Instagram") &&
        content.length > instagramLimit && (
          <p className="error">
            ❌ Instagram supports only {instagramLimit} characters.
          </p>
        )}

      {platforms.includes("Facebook") &&
        content.length > facebookLimit && (
          <p className="error">
            ❌ Facebook character limit exceeded.
          </p>
        )}

      <button onClick={savePost}>Save Post</button>

      {message && (
        <p
          className={
            message.includes("Successfully") ? "success" : "error"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default PostComposer;
