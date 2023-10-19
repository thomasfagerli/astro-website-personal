document.addEventListener("DOMContentLoaded", () => {
    const solveButton = document.getElementById("solveButton");
    solveButton.addEventListener("click", solveSudoku);
});

window.location.reload();

export async function solveSudoku() {
    
    const table = document.querySelector("table");
    let board = [];
    for (let row of table.rows) {
        let currentRow = [];
        for (let cell of row.cells) {
            currentRow.push(Number(cell.firstChild.value) || 0);
        }
        board.push(currentRow);
    }

    try {
        // Adjust the following line to point to your PythonAnywhere subdomain
        let response = await fetch("https://thomasfagerli.pythonanywhere.com/solve", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ board: board })
        });

        let data = await response.json();
        
        if (data.status === "success") {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    table.rows[i].cells[j].firstChild.value = data.board[i][j];
                }
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error details:", error);
        alert("Failed to solve. Check your input or try again later.");
    }
}
