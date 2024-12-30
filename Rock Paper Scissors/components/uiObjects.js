const avatarUI = `
<nav class="navbar navbar-expand-md fixed-top bg-light justify-content-evenly row">
  <div class="col-sm-8">
    <h1>
      <span class="sr-only">Rock, Paper, Scissors, Shoot!</span>
      <span aria-hidden="true"><img src="img/rock.png"><img src="img/paper.png"><img src="img/scissors.png"><img src="img/shoot.png"></span>
    </h1>
  </div>
</nav>

<div class="container-md">
  <div class="row row-start-button">
    <div class ="col-sm-4"></div>
    <div class="col-sm-4 d-flex justify-content-center" id="reset-buttons">
      <button type="button" id="start-button" class="btn btn-outline-primary disabled btn-lg">Choose an Avatar to Start</button>
    </div>
    <div class ="col-sm-4"></div>
  </div>
  <div id="app"></div>
</div>

<nav class="navbar fixed-bottom navbar-expand-sm center-text bg-light d-flex justify-content-center">
<p class="center-text"><a href="https://github.com/pmentropy/rock-paper-scissors" target="_blank">View on GitHub</a></p>
</nav>
`

const gamePlayUI = `
<div class="row d-flex align-items-center justify-content-center">
            <div class="col-4">
              <div class="card bg-default">
                <div class="card-header">
                  <div class="player-icon"><img src="img/char/monkey.png" alt="monkey face emoji"  aria-hidden="true"><h3 class="sr-only">Player</h3></div>
                </div>
                <div class="card-body score-area">
                  <div class="scorecard-body" id="user-score">0</div>
                </div>
                <div class="card-footer">
                  <div class="aggregates">
                    <div></div>
                    <div><img src="img/rock.png"><span id="userRockCount">0</span></div>
                    <div><img src="img/paper.png"><span id="userPaperCount">0</span></div>
                    <div><img src="img/scissors.png"><span id="userScissorsCount">0</span></div>
                    <div></div>
                  </div>
                </div> 
              </div>
            </div>
            <div class="col-1 d-flex align-items-center justify-content-center">
                  <div>
                  <h2 class="huge"> vs </h2><p><small>First to 5 wins</small></p>
                  </div>
            </div>
            <div class="col-4">
              <div class="card bg-default">
                <div class="card-header">
                  <div class="comp-icon"><img src="img/robot.png" alt="robot face emoji"  aria-hidden="true"><h3 class="sr-only">Computer</h3></div>
                </div>
                <div class="card-body score-area">
                  <div class="scorecard-body" id="comp-score">0</div>
                </div>
                <div class="card-footer">
                  <div class="aggregates">
                    <div></div>
                    <div><img src="img/rock.png"><span id="compRockCount">0</span></div>
                    <div><img src="img/paper.png"><span id="compPaperCount">0</span></div>
                    <div><img class="flip-horizontal" src="img/scissors.png"><span id="compScissorsCount">0</span></div>
                    <div></div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-9">
              <div class="card">
                <h5 class="card-header">
                  <span id="round-number">Round: 1</span>
                </h5>
                <div class="card-body" id="play-input">
                  <p class="card-text" id="play-confirm">
                    Shoot!
                  </p>
                  <div class="play-buttons">
                    <button type="button" id="rockSubmit" class="btn btn-outline-primary btn-lg">
                      <img src="img/rock.png">
                    </button>
                    <button type="button" id="paperSubmit" class="btn btn-outline-primary btn-lg">
                      <img src="img/paper.png">
                    </button>
                    <button type="button" id="scissorsSubmit" class="btn btn-outline-primary btn-lg">
                      <img src="img/scissors.png">
                    </button>
                  </div>
                  <div class="playsubmit">
                    <button type="button" id="play-submit" class="btn btn-outline-primary btn-lg">
                      <img src="img/shoot.png" alt="shoot emoji"><span id="user-choice"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="row d-flex align-items-center justify-content-center">
              <div class="col-5">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th colspan="2" class="player-icon">Player</th>
                      <th></th>
                      <th colspan="2" class="comp-icon"><img src="img/robot.png" alt="robot face emoji"  aria-hidden="true"><h3 class="sr-only">Computer</h3></th>
                    <tr>
                  </thead>
                  <tbody id="game-history">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>
`;

const historyTR = `
    <td scope="row" class="user-disk"></td>
    <td class="user-play"></td>
    <td class="history-round text-muted"></td>
    <td class="comp-play"></td>
    <td class="comp-disk"></td>`;

export { avatarUI, gamePlayUI, historyTR }