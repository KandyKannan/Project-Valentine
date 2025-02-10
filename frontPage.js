const form = document.getElementById('mainForm');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;

    if (name1.trim() === "" || name2.trim() === "") {
        alert("Please fill in both names.");
        return;
    }

    localStorage.setItem('sweet_name', name1);
    localStorage.setItem('valentine_name', name2);

    // *** Send data to Formspree ***
    fetch('https://formspree.io/f/xvgzqjnv', {  // Replace with your Formspree endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Or 'application/x-www-form-urlencoded' if needed
        },
        body: JSON.stringify({  // Or format as needed for x-www-form-urlencoded
            sweet_name: name1,
            valentine_name: name2
        })
    })
        .then(response => {
            if (response.ok) {
                // Formspree submission successful
                window.location.href = "secondPage.html"; // Redirect after successful submission
            } else {
                // Formspree submission failed
                alert("There was an error submitting the form."); // Handle error
                console.error("Formspree submission error:", response.status); // Log error for debugging
            }
        })
        .catch(error => {
            alert("There was an error submitting the form."); // Handle error
            console.error("Formspree submission error:", error); // Log error for debugging
        });
});
