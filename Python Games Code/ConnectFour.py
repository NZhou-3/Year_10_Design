import random
from datetime import datetime
placeholder = ' '

def formatBoard(board, col, index):
    try:
        return board[col][index]
    except IndexError:
        return placeholder

def print_board(board):

    for num in reversed(range(0, 6)):
        boardLine = " | "
        for index in range(0, 7):
            boardLine = boardLine + formatBoard(board, index, num) + ' ' 
        print(boardLine + "| ")
        print("   ---+---+---+---+---+---+---+---+---")

def check_winner(board):
  print('later')
  return False

def is_board_full(board):
    for col in board:
        # CHeck if array length is 7
        if len(col) != 7:
            return False

    return True
    
def play(board):
    while True:
        col = input("Enter column number: ")
        while not col.isdigit() or int(col) < 1 or int(col) > 7:
            col = input("Enter column number between 1-7: ")
        col = int(col)

        if len(board[col]) > 6:
            print("Pick an empty box!")
        else:
            return (col-1)
def play_random(board):
    possible_moves = []
    for num in range(0, 7):
      if len(board[num]) <= 7:
        # Add to possible
        possible_moves.append(num)

    return possible_moves[random.randrange(len(possible_moves))]
def main():
    random.seed(datetime.now())
    print("\n== Tic Tac Toe ==")
    # Create an empty board

    board = [ 
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]
    # Create 2 players
    players = ["X", "O"]
    # Player X plays first
    turn = 0
    while not is_board_full(board):
        print_board(board)
        if turn == 0:
            # User input
            print("You play!")
            col = play(board)
            board[col].append(players[turn])
            
        else:
            # Compuuter plays
            print("Computer plays!")
            col = play_random(board)
            board[col].append(players[turn])
        # Check if the player won
        if check_winner(board):
            print_board(board)
            print("You won!" if turn == 0 else "Computer won!")
            break
        
        # Select the next player
        turn = 1 - turn
    
    else:
        print_board(board)
        print("It's a tie!")
main()