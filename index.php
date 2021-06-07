<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">

    <title>ORBITALS</title>
    <meta name="description" content="aaa">
    <meta name="author" content="bbb">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/styles.css">
    <script src="js/renderer.js"></script>
    <script src="js/figure_showcase.js"></script>
    
  </head>

  <body>
    <?php include 'read_db.php'; ?>
    <div class="content">
        <header>
          <a href="index.php">ORBITALS</a>
          <table id='title_table'>
            <tr>
              <td>Title</td>
            </tr>
          </table>
        </header>
        <canvas canvas id="figure_renderer" width="600" height="600"></canvas>
    </div>
    <footer>
      <a href="creator.php">Create a new shape</a>
    </footer>
  </body>
</html>