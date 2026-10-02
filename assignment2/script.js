let modal = document.getElementById("modal");
let openBtn = document.getElementById("open-btn");

openBtn.onclick = () => {
	modal.showModal();
};

window.onclick = (event) => {
	if (event.target === modal) {
		modal.close();
	}
};

document.getElementById("add-form").addEventListener("submit", async (e) => {
	e.preventDefault();

	const title = document.getElementById("title").value;
	const body = document.getElementById("body").value;
	const titleError = document.getElementById("title-error");
	const bodyError = document.getElementById("body-error");

	const titleEmpty = title.trim() === "";
	const titleMoreThan30 = title.length > 30;
	const titleHasDigit = /\d/.test(title);
	const bodyEmpty = body.trim() === "";
	const bodyHasDigit = /\d/.test(body);

	if (
		titleEmpty ||
		titleMoreThan30 ||
		titleHasDigit ||
		bodyEmpty ||
		bodyHasDigit
	) {
		if (titleEmpty) {
			titleError.textContent = "Title is required!";
		} else if (titleMoreThan30) {
			titleError.textContent =
				"Title must have less than or equal to 30 characters!";
		} else if (titleHasDigit) {
			titleError.textContent = "Title must have no digits!";
		}

		if (bodyEmpty) {
			bodyError.textContent = "Body is required!";
		} else if (bodyHasDigit) {
			bodyError.textContent = "Body must have no digits!";
		}
	} else {
		titleError.textContent = "";
		bodyError.textContent = "";

		const response = await fetch(
			"https://jsonplaceholder.typicode.com/posts",
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ title, body, userId: 1 }),
			},
		);
		const result = await response.json();

		const finalPost = document.getElementById("final-post");
		finalPost.innerHTML = `
			<p style="margin: 10px 0 0 0;">Success! Here are the details of your post:</p>
			<strong>ID: </strong> ${result.id} <br>
			<strong>Title: </strong> ${result.title} <br>
			<strong>Body: </strong> ${result.body} <br>
		`;
	}
});
